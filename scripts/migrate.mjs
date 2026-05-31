// Применение миграций к облачному Postgres (Supabase) напрямую.
//
// Запуск:  SUPABASE_DB_URL="postgresql://...:6543/postgres" node scripts/migrate.mjs
// Строку подключения берём из Supabase → Project Settings → Database →
// Connection string → URI (pooler). Один раз кладём её в .env моста как
// SUPABASE_DB_URL, дальше миграции катаются без участия человека.
//
// Все шаги ИДЕМПОТЕНТНЫ (if not exists) — безопасно гонять повторно.

import pg from "pg";

const MIGRATIONS = [
  // 2026-06-01 · знакомство (имя) + подписка в профиле
  `alter table public.profiles add column if not exists name text;`,
  `alter table public.profiles add column if not exists subscription jsonb
     not null default '{"plan":"free","status":"none","renewsAt":null}'::jsonb;`,
];

async function main() {
  const url = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "Нет SUPABASE_DB_URL. Пример:\n  SUPABASE_DB_URL='postgresql://postgres.<ref>:<pass>@<host>:6543/postgres' node scripts/migrate.mjs"
    );
    process.exit(1);
  }

  const client = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    for (const sql of MIGRATIONS) {
      await client.query(sql);
      console.log("✓", sql.split("\n")[0].trim());
    }
    // Контроль: убедимся, что колонки на месте.
    const { rows } = await client.query(
      `select column_name from information_schema.columns
         where table_schema='public' and table_name='profiles'
           and column_name in ('name','subscription') order by column_name;`
    );
    console.log(
      "колонки profiles:",
      rows.map((r) => r.column_name).join(", ") || "— нет —"
    );
  } finally {
    await client.end();
  }
}

main().catch((e) => {
  console.error("migrate failed:", e.message);
  process.exit(1);
});
