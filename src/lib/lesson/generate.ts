// Промпт-билдер + парсер ответа модели (Фаза 3, docs/CONCEPT.md — «Claude генерит упражнения»).
// Тут НЕТ вызова сети: только (1) сборка строгого промпта под схему LessonItem и
// (2) извлечение JSON-массива из сырого текста модели. Сам вызов — в claude.ts/route.ts.
// Разделение нарочно: промпт и парсер чисто тестируются, без зависимости от SDK/токена.

import type { ConceptId } from "@/lib/store/types";
import type { LessonKind } from "@/lib/lesson/items";

/** Параметры заказа на генерацию пачки айтемов. */
export interface GenerateParams {
  /** Тема урока (совпадает с LessonItem.topic), напр. "present-continuous". */
  topic: string;
  /** Грамматическая схема: определяет, какие поля и правила требовать. По умолчанию present-continuous. */
  kind?: LessonKind;
  /** Сколько айтемов сгенерить. */
  count: number;
  /** Какие концепции подачи обязательно положить в byConcept (минимум — то, что движок может выбрать). */
  concepts: ConceptId[];
  /** Уровень CEFR ученика — модель калибрует лексику/длину под него. */
  cefrLevel?: string;
  /** Цель ученика из onboarding — модель подбирает ситуации и лексику под неё. */
  goal?: string;
}

/**
 * Строгий системный промпт: задаёт роль, формат и ЖЁСТКИЕ инварианты,
 * которые потом перепроверит validate.ts. Дублирование намеренное —
 * промпт снижает брак на входе, валидатор ловит остаток.
 */
export function buildSystemPrompt(kind: LessonKind = "present-continuous"): string {
  // Общая шапка + общие поля схемы (одинаковы для всех тем).
  const head = [
    "Ты — генератор тренажёров по английской грамматике для русскоязычных учеников.",
    "Возвращаешь ТОЛЬКО валидный JSON-массив объектов LessonItem. Без markdown, без пояснений, без обрамляющего текста.",
    "",
    "Общие поля каждого LessonItem:",
    "{",
    `  "kind": "${kind}",            // ровно эта строка`,
    '  "topic": string,              // тема, ровно как просили',
    '  "ru": string,                 // русское предложение для перевода',
    '  "subject": string,            // подлежащее: I | He | She | It | We | You | They (или существительное)',
    '  "correct": string[],          // эталонный порядок слов английского ответа (токены по словам)',
    '  "bank": string[],             // те же слова + 1–2 дистрактора',
    '  "byConcept": {                // объяснения по концепциям подачи (HTML внутри строк разрешён)',
    '    "<conceptId>": { "whyOk": string, "bridge": string, "rule": string }',
    "  },",
    '  "whyOk": string,              // плоский fallback = объяснение в стиле contrast-native (сравнение с русским)',
    '  "bridge": string,             // плоский fallback, развёрнутый «ага»-разбор (>= 20 символов)',
    '  "rule": string                // плоский fallback, сухая формула (>= 8 символов)',
  ];

  // Общие правила (для всех тем).
  const commonRules = [
    "A) bank ДОЛЖЕН содержать каждое слово из correct (как мультимножество) плюс 1–2 дистрактора.",
    "B) Объяснения на русском, термины-английские слова оборачивай в <b>…</b>. whyOk ≥ 12, bridge ≥ 20, rule ≥ 8 символов.",
    "C) byConcept содержит ровно запрошенные концепции, каждая — с непустыми whyOk/bridge/rule.",
    "D) Никаких лишних полей. Только JSON-массив на верхнем уровне.",
  ];

  if (kind === "present-continuous") {
    return [
      ...head,
      '  ,"be": "am" | "is" | "are",   // вспомогательный по лицу: I→am; he/she/it→is; we/you/they/мн.ч.→are',
      '  "ing": { "base": string, "form": string } // голый глагол и его -ing-форма (read → reading)',
      "}",
      "",
      "Тема — Present Continuous («прямо сейчас»): subject + be + глагол-ing + остальное.",
      "ЖЁСТКИЕ ПРАВИЛА (нарушишь — айтем выбросят):",
      "1) be обязан стоять внутри correct и соответствовать лицу subject.",
      "2) ing.form обязан быть внутри correct; ing.base НЕ должен быть внутри correct (он только дистрактор в bank).",
      ...commonRules,
    ].join("\n");
  }

  if (kind === "past-simple") {
    return [
      ...head,
      "}",
      "",
      "Тема — Past Simple (завершённое действие в прошлом): subject + глагол в прошедшем времени (V2) + остальное.",
      "Поля be/ing для этой темы НЕ нужны — не добавляй их.",
      "ЖЁСТКИЕ ПРАВИЛА (нарушишь — айтем выбросят):",
      "1) В correct стоит именно форма прошедшего времени (went, watched, saw, bought…), НЕ инфинитив.",
      "2) В bank положи дистрактором инфинитив или present-форму глагола (go/goes к went) — чтобы было что перепутать.",
      "3) Для отрицаний/вопросов используй did/didn't корректно (did + базовая форма).",
      ...commonRules,
    ].join("\n");
  }

  // articles (a / an / the / zero article)
  return [
    ...head,
    "}",
    "",
    "Тема — Articles (a / an / the): постановка артикля. Для русскоязычных это слабое место — в русском артиклей нет.",
    "Поля be/ing для этой темы НЕ нужны — не добавляй их.",
    "ЖЁСТКИЕ ПРАВИЛА (нарушишь — айтем выбросят):",
    "1) В correct стоит правильный артикль (a/an/the) на своём месте; a перед согласным звуком, an перед гласным.",
    "2) В bank положи дистрактором другой артикль (если correct=a, добавь an и/или the) — чтобы было что перепутать.",
    "3) Объяснения акцентируй на контрасте с русским: «в русском артикля нет, в английском он обязателен потому что…».",
    ...commonRules,
  ].join("\n");
}

/** Человекочитаемое имя концепции — чтобы модель понимала, какой стиль писать. */
const CONCEPT_HINT: Record<ConceptId, string> = {
  "rule-first": "сначала формула/правило, потом пример",
  "examples-first": "сначала ряд примеров, ученик сам выводит правило",
  "context-story": "тема внутри живой ситуации/диалога",
  "contrast-native": "сравнение «как в русском vs как в английском»",
};

/** Пользовательский промпт: что именно сгенерить в этот раз. */
export function buildUserPrompt(params: GenerateParams): string {
  const { topic, count, concepts, cefrLevel, goal } = params;
  const conceptLines = concepts
    .map((c) => `  - "${c}": ${CONCEPT_HINT[c]}`)
    .join("\n");
  return [
    `Сгенерируй ${count} разных упражнений по теме "${topic}".`,
    cefrLevel ? `Уровень ученика: ${cefrLevel} (калибруй лексику и длину фразы).` : "",
    goal ? `Цель ученика: ${goal} (подбирай жизненные ситуации и лексику под эту цель).` : "",
    "Каждое упражнение — отдельное русское предложение для перевода на английский.",
    "Разнообразь подлежащие (I/He/She/It/We/You/They) и глаголы.",
    "В byConcept положи эти концепции:",
    conceptLines,
    "",
    "Верни JSON-массив из ровно этого числа объектов. Только JSON.",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Достать JSON-массив из сырого ответа модели.
 * Терпим к обрамлению: ```json … ```, ведущий текст, висящие переводы строк.
 * Возвращает массив unknown (валидацию делает validate.ts), либо null если распарсить нельзя.
 */
export function parseItemsJson(raw: string): unknown[] | null {
  if (typeof raw !== "string" || raw.trim().length === 0) return null;
  let text = raw.trim();

  // Снять markdown-ограждение ```json … ``` или ``` … ```
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) text = fence[1].trim();

  // Вырезать первый массив [ … ] (на случай ведущего/хвостового текста)
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;
  const slice = text.slice(start, end + 1);

  try {
    const parsed = JSON.parse(slice);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
