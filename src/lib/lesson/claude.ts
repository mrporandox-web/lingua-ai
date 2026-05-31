// Серверный вызов Claude через Agent SDK на OAuth-токене (Max-подписка, $0).
// ВАЖНО: только server-side (импортится из API-route). Токен НИКОГДА не уходит в браузер.
// SDK спавнит дочерний `claude` CLI; токен берётся из process.env.CLAUDE_CODE_OAUTH_TOKEN,
// который боевой мост (claude-tg-lingua) прокидывает при запуске Next-сервера.
//
// Конфиг намеренно МИНИМАЛЬНЫЙ (в отличие от runner.ts моста):
//  - нет MCP, нет claude_code preset, нет settingSources (не грузим CLAUDE.md);
//  - maxTurns=1 — одношаговая генерация JSON, без агентских циклов;
//  - системный промпт — наш строгий генератор из generate.ts.
// Если SDK/токена нет — бросаем ошибку, выше по стеку route отдаёт фолбэк на статику.

import { query } from "@anthropic-ai/claude-agent-sdk";
import { buildSystemPrompt, buildUserPrompt, type GenerateParams } from "@/lib/lesson/generate";

/** Есть ли OAuth-токен в окружении сервера (без него вызов невозможен). */
export function hasClaudeAuth(): boolean {
  return typeof process.env.CLAUDE_CODE_OAUTH_TOKEN === "string" &&
    process.env.CLAUDE_CODE_OAUTH_TOKEN.length > 0;
}

/** Модель для генерации: env override → дефолт (быстрая/дешёвая, задача простая). */
function resolveModel(): string {
  return process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001";
}

/**
 * Один вызов Claude → СЫРОЙ текст ответа модели (JSON-массив внутри, парсит вызывающий).
 * Бросает, если нет токена или SDK вернул ошибку/пусто — route ловит и отдаёт фолбэк.
 */
export async function generateRawItems(params: GenerateParams): Promise<string> {
  if (!hasClaudeAuth()) {
    throw new Error("CLAUDE_CODE_OAUTH_TOKEN отсутствует — генерация недоступна");
  }

  const system = buildSystemPrompt(params.kind);
  const userPrompt = buildUserPrompt(params);

  // Системный промпт прокидываем как явный текст (type:'text'), а не claude_code preset:
  // нам нужен чистый генератор JSON, а не агент с тулами.
  const messages = query({
    prompt: userPrompt,
    options: {
      model: resolveModel(),
      maxTurns: 1,
      permissionMode: "bypassPermissions",
      // Никаких настроек-источников: не подмешиваем CLAUDE.md/проектные правила в генератор.
      settingSources: [],
      systemPrompt: system,
      // env дочернего cli.js ЗАМЕНЯЕТ process.env — обязательно spread'им,
      // иначе слетит CLAUDE_CODE_OAUTH_TOKEN (Max-авторизация).
      env: { ...process.env },
    },
  });

  let out = "";
  for await (const message of messages) {
    const msg = message as {
      type?: string;
      subtype?: string;
      result?: string;
      message?: { content?: Array<{ type?: string; text?: string }> };
    };
    if (msg.type === "assistant" && msg.message?.content) {
      for (const block of msg.message.content) {
        if (block.type === "text" && typeof block.text === "string") {
          out += block.text;
        }
      }
    } else if (msg.type === "result") {
      if (msg.subtype && msg.subtype !== "success") {
        throw new Error(`Claude generate failed: ${msg.subtype}`);
      }
      if (!out && typeof msg.result === "string") out = msg.result;
    }
  }

  if (!out.trim()) throw new Error("Claude вернул пустой ответ");
  return out;
}
