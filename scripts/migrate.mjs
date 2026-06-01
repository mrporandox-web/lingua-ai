// Применение миграций к облачному Postgres (Supabase) через Management API.
//
// Запуск:  node scripts/migrate.mjs
// Токен берётся из SUPABASE_ACCESS_TOKEN (Personal Access Token, sbp_...).
// Лежит в .env моста (claude-tg-lingua/.env) — скрипт читает его сам, либо
// можно передать через окружение: SUPABASE_ACCESS_TOKEN=sbp_... node scripts/migrate.mjs
//
// Почему Management API, а не connection string: не нужен пароль БД — PAT
// аккаунта даёт право выполнить SQL на проекте. Все шаги ИДЕМПОТЕНТНЫ.

import { readFileSync } from "node:fs";

const PROJECT_REF = "rpromuftcsbkstazjctr"; // общий облачный проект флота
const BRIDGE_ENV = "/Users/exz/projects/claude-tg-lingua/.env";

const MIGRATIONS = [
  // 2026-06-01 · знакомство (имя) + подписка в профиле
  `alter table public.profiles add column if not exists name text;`,
  `alter table public.profiles add column if not exists subscription jsonb
     not null default '{"plan":"free","status":"none","renewsAt":null}'::jsonb;`,
];

function readToken() {
  if (process.env.SUPABASE_ACCESS_TOKEN) return process.env.SUPABASE_ACCESS_TOKEN;
  try {
    const env = readFileSync(BRIDGE_ENV, "utf8");
    const m = env.match(/^SUPABASE_ACCESS_TOKEN=(.+)$/m);
    if (m) return m[1].trim().replace(/^"|"$/g, "");
  } catch {}
  return null;
}

async function runSql(token, query) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const token = readToken();
  if (!token) {
    console.error(
      "Нет SUPABASE_ACCESS_TOKEN (ни в env, ни в .env моста). Выпусти PAT на\n" +
        "https://supabase.com/dashboard/account/tokens и положи в .env."
    );
    process.exit(1);
  }
  for (const sql of MIGRATIONS) {
    await runSql(token, sql);
    console.log("✓", sql.split("\n")[0].trim());
  }
  const cols = await runSql(
    token,
    `select column_name from information_schema.columns
       where table_schema='public' and table_name='profiles'
         and column_name in ('name','subscription') order by column_name;`
  );
  console.log(
    "колонки profiles:",
    cols.map((r) => r.column_name).join(", ") || "— нет —"
  );
}

main().catch((e) => {
  console.error("migrate failed:", e.message);
  process.exit(1);
});
