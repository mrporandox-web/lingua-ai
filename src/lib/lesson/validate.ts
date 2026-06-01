// Слой валидации сгенерённых упражнений (Фаза 3, docs/CONCEPT.md — «слой валидации обязателен»).
// Главный риск AI-генерации — кривое задание (банк без нужных слов, рассинхрон be↔лицо,
// -ing-форма не из ответа). Тут — чистые проверки: невалидный айтем НЕ доходит до ученика.
// Без сайд-эффектов; принимает «сырой» unknown из модели, на выходе — типобезопасный LessonItem.

import type { ConceptId } from "@/lib/store/types";
import { ALL_CONCEPTS } from "@/lib/store/types";
import type {
  ConceptExplain,
  LessonItem,
  LessonKind,
} from "@/lib/lesson/items";

/** Известные kind'ы (для распознавания сырого raw.kind). */
const KINDS: LessonKind[] = [
  "present-continuous",
  "past-simple",
  "articles",
  "to-be",
  "pronouns",
  "plurals",
  "present-simple",
  "have-got",
  "possessives",
  "this-that",
];

/** Достать kind из сырого объекта; неизвестный/отсутствующий → present-continuous (legacy). */
function readKind(o: Record<string, unknown>): LessonKind {
  const k = o.kind;
  return typeof k === "string" && KINDS.includes(k as LessonKind)
    ? (k as LessonKind)
    : "present-continuous";
}

/** Результат валидации одного айтема: либо годный LessonItem, либо причины отбраковки. */
export type ValidateResult =
  | { ok: true; item: LessonItem }
  | { ok: false; reasons: string[] };

const BE_FORMS = ["am", "is", "are"] as const;
type Be = (typeof BE_FORMS)[number];

/** Какой be положен по подлежащему (грамматический инвариант Present Continuous). */
function expectedBe(subject: string): Be {
  const s = subject.trim().toLowerCase();
  if (s === "i") return "am";
  if (["he", "she", "it"].includes(s)) return "is";
  // we/you/they + любое множественное существительное → are
  return "are";
}

/** Непустая строка (после трима). */
function isNonEmptyStr(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/** Массив непустых строк. */
function isStrArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.length > 0 && v.every(isNonEmptyStr);
}

/** HTML-объяснение не пустое и не подозрительно короткое (отлов «заглушек» от модели). */
function isExplainBlock(v: unknown): v is ConceptExplain {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    isNonEmptyStr(o.whyOk) &&
    isNonEmptyStr(o.bridge) &&
    isNonEmptyStr(o.rule) &&
    (o.whyOk as string).length >= 12 &&
    (o.bridge as string).length >= 20 &&
    (o.rule as string).length >= 8
  );
}

/** Multiset-проверка: каждое слово correct реально лежит в bank нужное число раз. */
function bankCoversCorrect(bank: string[], correct: string[]): boolean {
  const pool = new Map<string, number>();
  for (const w of bank) pool.set(w, (pool.get(w) ?? 0) + 1);
  for (const w of correct) {
    const left = pool.get(w) ?? 0;
    if (left <= 0) return false;
    pool.set(w, left - 1);
  }
  return true;
}

/**
 * Провалидировать ОДИН сырой объект из модели → LessonItem или причины отказа.
 * Жёсткие инварианты (любой провал = брак):
 *  - topic/ru/subject — непустые строки;
 *  - correct, bank — непустые массивы строк; bank покрывает correct (multiset);
 *  - be ∈ {am,is,are} И совпадает с лицом subject;
 *  - be реально стоит в correct;
 *  - ing.form ∈ correct, ing.base ∉ correct (иначе путаница голый/-ing);
 *  - плоские whyOk/bridge/rule — валидные HTML-объяснения;
 *  - byConcept — только известные ConceptId, каждый блок валиден.
 */
export function validateLessonItem(raw: unknown): ValidateResult {
  const reasons: string[] = [];
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, reasons: ["не объект"] };
  }
  const o = raw as Record<string, unknown>;
  const kind = readKind(o);
  const isPC = kind === "present-continuous";

  // --- ОБЩИЕ инварианты (для всех kind) ---
  if (!isNonEmptyStr(o.topic)) reasons.push("topic пуст");
  if (!isNonEmptyStr(o.ru)) reasons.push("ru пуст");
  if (!isNonEmptyStr(o.subject)) reasons.push("subject пуст");
  if (!isStrArray(o.correct)) reasons.push("correct не массив строк");
  if (!isStrArray(o.bank)) reasons.push("bank не массив строк");

  // bank ⊇ correct (multiset) — только если оба массива валидны
  if (isStrArray(o.correct) && isStrArray(o.bank)) {
    if (!bankCoversCorrect(o.bank, o.correct)) {
      reasons.push("bank не покрывает correct");
    }
  }

  // --- PC-СПЕЦИФИЧНЫЕ инварианты (be + ing) ---
  // Для past-simple/articles be/ing не нужны — эти поля игнорируем.
  const be = o.be;
  const ing = o.ing as { base?: unknown; form?: unknown } | undefined;

  if (isPC) {
    // be: значение из набора + соответствие лицу
    if (typeof be !== "string" || !BE_FORMS.includes(be as Be)) {
      reasons.push("be не am/is/are");
    } else if (isNonEmptyStr(o.subject)) {
      const exp = expectedBe(o.subject);
      if (be !== exp) {
        reasons.push(`be=${be} не соответствует лицу «${o.subject}» (нужно ${exp})`);
      }
    }

    // ing: форма из ответа, голый глагол — нет
    if (
      typeof ing !== "object" ||
      ing === null ||
      !isNonEmptyStr(ing.base) ||
      !isNonEmptyStr(ing.form)
    ) {
      reasons.push("ing.{base,form} не строки");
    }

    // be должен стоять в эталонном ответе
    if (
      typeof be === "string" &&
      BE_FORMS.includes(be as Be) &&
      isStrArray(o.correct) &&
      !o.correct.includes(be)
    ) {
      reasons.push("be отсутствует в correct");
    }

    // -ing-форма в ответе, голый глагол — не в ответе
    if (
      ing &&
      isNonEmptyStr(ing.form) &&
      isNonEmptyStr(ing.base) &&
      isStrArray(o.correct)
    ) {
      if (!o.correct.includes(ing.form)) {
        reasons.push(`ing.form «${ing.form}» нет в correct`);
      }
      if (o.correct.includes(ing.base)) {
        reasons.push(`ing.base «${ing.base}» не должен быть в correct`);
      }
    }
  }

  // плоские объяснения (fallback = contrast-native)
  const flat: ConceptExplain = {
    whyOk: o.whyOk as string,
    bridge: o.bridge as string,
    rule: o.rule as string,
  };
  if (!isExplainBlock(flat)) {
    reasons.push("плоские whyOk/bridge/rule невалидны");
  }

  // byConcept: только известные концепции, каждый блок валиден
  const byConcept: Partial<Record<ConceptId, ConceptExplain>> = {};
  if (o.byConcept !== undefined) {
    if (typeof o.byConcept !== "object" || o.byConcept === null) {
      reasons.push("byConcept не объект");
    } else {
      for (const [k, v] of Object.entries(o.byConcept)) {
        if (!ALL_CONCEPTS.includes(k as ConceptId)) {
          reasons.push(`byConcept: неизвестная концепция «${k}»`);
          continue;
        }
        if (!isExplainBlock(v)) {
          reasons.push(`byConcept.${k} невалиден`);
          continue;
        }
        byConcept[k as ConceptId] = v;
      }
    }
  }

  if (reasons.length) return { ok: false, reasons };

  // Все инварианты пройдены — собираем типобезопасный LessonItem.
  const item: LessonItem = {
    topic: (o.topic as string).trim(),
    kind,
    ru: (o.ru as string).trim(),
    correct: o.correct as string[],
    bank: o.bank as string[],
    subject: (o.subject as string).trim(),
    byConcept,
    whyOk: flat.whyOk,
    bridge: flat.bridge,
    rule: flat.rule,
  };
  // be/ing кладём ТОЛЬКО для present-continuous (для остальных kind их нет).
  if (isPC && ing) {
    item.be = be as Be;
    item.ing = {
      base: (ing.base as string).trim(),
      form: (ing.form as string).trim(),
    };
  }
  return { ok: true, item };
}

/**
 * Провалидировать пачку сырых айтемов. Брак отсеивается (не роняет всю пачку),
 * но причины копятся для лога/диагностики. Возвращает только годные.
 */
export function validateBatch(raws: unknown[]): {
  items: LessonItem[];
  rejected: { index: number; reasons: string[] }[];
} {
  const items: LessonItem[] = [];
  const rejected: { index: number; reasons: string[] }[] = [];
  raws.forEach((raw, index) => {
    const res = validateLessonItem(raw);
    if (res.ok) items.push(res.item);
    else rejected.push({ index, reasons: res.reasons });
  });
  return { items, rejected };
}
