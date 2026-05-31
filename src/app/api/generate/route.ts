// POST /api/generate — серверная генерация упражнений через Claude (Фаза 3).
// Контракт ответа НИКОГДА не падает: при любом сбое (нет токена, ошибка SDK,
// невалидный JSON, весь батч забракован) возвращаем { items: [], source: "fallback" },
// и клиент тихо уходит на статические ITEMS. Продукт не ломается ни в одном случае.
//
// Runtime = nodejs (НЕ edge): SDK спавнит дочерний `claude` CLI, нужен полный Node.
// Токен CLAUDE_CODE_OAUTH_TOKEN берётся из process.env (боевой мост прокидывает
// его при запуске Next-сервера) и НИКОГДА не уходит в браузер — вызов только тут.

import { NextResponse } from "next/server";
import { ALL_CONCEPTS, type ConceptId } from "@/lib/store/types";
import type { GenerateParams } from "@/lib/lesson/generate";
import { parseItemsJson } from "@/lib/lesson/generate";
import { validateBatch } from "@/lib/lesson/validate";
import { generateRawItems, hasClaudeAuth } from "@/lib/lesson/claude";
import type { LessonItem, LessonKind } from "@/lib/lesson/items";

export const runtime = "nodejs";
// Генерация — динамическая, кэшировать ответ нельзя.
export const dynamic = "force-dynamic";

/** Тело запроса от клиента (всё опционально — есть дефолты). */
interface GenerateBody {
  topic?: unknown;
  count?: unknown;
  concepts?: unknown;
  cefrLevel?: unknown;
}

/** Ответ роута: либо сгенерённые валидные айтемы, либо сигнал фолбэка. */
interface GenerateResponse {
  items: LessonItem[];
  source: "claude" | "fallback";
  /** Диагностика (не для UI): сколько забраковано и почему — видно в Network. */
  rejected?: { index: number; reasons: string[] }[];
  error?: string;
}

const DEFAULT_TOPIC = "present-continuous";
const DEFAULT_COUNT = 3;
const MIN_COUNT = 1;
const MAX_COUNT = 8; // потолок: не жжём токены и не ждём долгий ответ

/**
 * topic → грамматическая схема (kind). topic у нас одновременно и ключ темы,
 * и сигнал, какую схему просить у модели. Неизвестная тема → present-continuous
 * (legacy-дефолт: старые запросы без явной темы остаются совместимыми).
 */
function topicToKind(topic: string): LessonKind {
  const t = topic.trim().toLowerCase();
  if (t === "past-simple") return "past-simple";
  if (t === "articles") return "articles";
  return "present-continuous";
}

/** Достать из произвольного тела безопасные GenerateParams с дефолтами и кэпами. */
function readParams(body: GenerateBody): GenerateParams {
  const topic =
    typeof body.topic === "string" && body.topic.trim()
      ? body.topic.trim()
      : DEFAULT_TOPIC;

  let count = DEFAULT_COUNT;
  if (typeof body.count === "number" && Number.isFinite(body.count)) {
    count = Math.max(MIN_COUNT, Math.min(MAX_COUNT, Math.round(body.count)));
  }

  // concepts: оставляем только известные ConceptId; пусто → все четыре.
  let concepts: ConceptId[] = [];
  if (Array.isArray(body.concepts)) {
    concepts = body.concepts.filter(
      (c): c is ConceptId =>
        typeof c === "string" && ALL_CONCEPTS.includes(c as ConceptId),
    );
  }
  if (concepts.length === 0) concepts = [...ALL_CONCEPTS];

  const cefrLevel =
    typeof body.cefrLevel === "string" && body.cefrLevel.trim()
      ? body.cefrLevel.trim()
      : undefined;

  return { topic, kind: topicToKind(topic), count, concepts, cefrLevel };
}

export async function POST(req: Request): Promise<NextResponse<GenerateResponse>> {
  // Нет токена — сразу фолбэк, без попытки вызова SDK.
  if (!hasClaudeAuth()) {
    return NextResponse.json({ items: [], source: "fallback", error: "no-auth" });
  }

  let params: GenerateParams;
  try {
    const body = (await req.json()) as GenerateBody;
    params = readParams(body ?? {});
  } catch {
    // Кривое тело — генерим дефолтную пачку (фолбэк параметров, не ошибка).
    params = readParams({});
  }

  try {
    const raw = await generateRawItems(params);
    const parsed = parseItemsJson(raw);
    if (!parsed) {
      return NextResponse.json({
        items: [],
        source: "fallback",
        error: "parse-failed",
      });
    }

    const { items, rejected } = validateBatch(parsed);
    if (items.length === 0) {
      // Весь батч забракован валидатором — уходим на статику.
      return NextResponse.json({
        items: [],
        source: "fallback",
        error: "all-rejected",
        rejected,
      });
    }

    return NextResponse.json({ items, source: "claude", rejected });
  } catch (e) {
    // Любая ошибка SDK/сети — мягкий фолбэк, продукт не падает.
    const error = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ items: [], source: "fallback", error });
  }
}
