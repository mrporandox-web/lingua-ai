// Программа A1 — кураторский скелет (16 тем в 4 юнитах). Это «слой валидации»:
// структуру и порядок фиксируем руками, наполнение каждой темы (упражнения)
// генерит AI поверх скелета. Сейчас контент есть только у present-continuous
// (status: ready), остальные — soon (открываются по мере генерации+валидации).
//
// Источник по объёму/маппингу — docs/RESEARCH-competitors.md (A1 ≈ 30 тем;
// для каркаса берём 16 опорных, чтобы программа выглядела цельной, не демо).

import type { CourseSection, CourseTopic, CourseUnit } from "./types";

// ── Темы A1 (id == topic в банке уроков) ────────────────────────────────────
export const A1_TOPICS: CourseTopic[] = [
  // Юнит 1 · Первые шаги — наполнен кураторским контентом (status: ready)
  { id: "to-be", title: "Глагол to be", blurb: "am / is / are — «быть»", cefr: "A1", status: "ready" },
  { id: "pronouns", title: "Местоимения", blurb: "I, you, he, she, it, we, they", cefr: "A1", status: "ready" },
  { id: "articles", title: "Артикли a / an / the", blurb: "когда какой и когда никакой", cefr: "A1", status: "ready" },
  { id: "plurals", title: "Множественное число", blurb: "-s, -es и исключения", cefr: "A1", status: "ready" },

  // Юнит 2 · О себе и людях — наполнен кураторским контентом (status: ready)
  { id: "present-simple", title: "Present Simple", blurb: "регулярные действия: I work", cefr: "A1", status: "ready" },
  { id: "have-got", title: "have / has got", blurb: "что у тебя есть", cefr: "A1", status: "ready" },
  { id: "possessives", title: "Притяжательные", blurb: "my, your, his, her", cefr: "A1", status: "ready" },
  { id: "this-that", title: "this / that / these / those", blurb: "этот и тот", cefr: "A1", status: "ready" },

  // Юнит 3 · Прямо сейчас — наполнен кураторским контентом (status: ready)
  { id: "present-continuous", title: "Present Continuous", blurb: "действие сейчас: am/is/are + -ing", cefr: "A1", status: "ready" },
  { id: "there-is", title: "there is / there are", blurb: "есть / находится", cefr: "A1", status: "ready" },
  { id: "prepositions-place", title: "Предлоги места", blurb: "in, on, at, under", cefr: "A1", status: "ready" },
  { id: "can-cant", title: "can / can't", blurb: "умение и возможность", cefr: "A1", status: "ready" },

  // Юнит 4 · Каждый день — наполнен кураторским контентом (status: ready)
  { id: "adverbs-frequency", title: "Наречия частоты", blurb: "always, usually, never", cefr: "A1", status: "ready" },
  { id: "like-ing", title: "like + -ing", blurb: "что нравится делать", cefr: "A1", status: "ready" },
  { id: "numbers-time", title: "Числа и время", blurb: "сколько времени, который час", cefr: "A1", status: "ready" },
  { id: "wh-questions", title: "Вопросы Wh-", blurb: "What, Where, When, Who", cefr: "A1", status: "ready" },
];

// ── Юниты A1 ────────────────────────────────────────────────────────────────
export const A1_UNITS: CourseUnit[] = [
  {
    id: "a1-basics",
    title: "Первые шаги",
    subtitle: "Глагол быть, местоимения, артикли",
    topicIds: ["to-be", "pronouns", "articles", "plurals"],
  },
  {
    id: "a1-people",
    title: "О себе и людях",
    subtitle: "Регулярные действия и принадлежность",
    topicIds: ["present-simple", "have-got", "possessives", "this-that"],
  },
  {
    id: "a1-now",
    title: "Прямо сейчас",
    subtitle: "Что происходит в моменте",
    topicIds: ["present-continuous", "there-is", "prepositions-place", "can-cant"],
  },
  {
    id: "a1-daily",
    title: "Каждый день",
    subtitle: "Привычки, время, вопросы",
    topicIds: ["adverbs-frequency", "like-ing", "numbers-time", "wh-questions"],
  },
];

// ── Секция A1 ───────────────────────────────────────────────────────────────
export const A1_SECTION: CourseSection = {
  cefr: "A1",
  title: "A1 · Beginner",
  unitIds: A1_UNITS.map((u) => u.id),
};

// ══ Уровень A2 ═══════════════════════════════════════════════════════════════
// Темы A2 (Юнит 1 «Прошлое» наполнен; остальные — скелет под наполнение).
export const A2_TOPICS: CourseTopic[] = [
  // Юнит 1 · Прошлое
  { id: "past-simple", title: "Past Simple", blurb: "правильные глаголы: -ed", cefr: "A2", status: "ready" },
  { id: "past-irregular", title: "Неправильные глаголы", blurb: "go→went, have→had", cefr: "A2", status: "ready" },
  { id: "past-continuous", title: "Past Continuous", blurb: "was/were + -ing", cefr: "A2", status: "ready" },
  { id: "used-to", title: "used to", blurb: "раньше делал, а теперь нет", cefr: "A2", status: "ready" },

  // Юнит 2 · Будущее и планы — наполнен кураторским контентом (status: ready)
  { id: "future-will", title: "Future will", blurb: "решения и обещания", cefr: "A2", status: "ready" },
  { id: "going-to", title: "be going to", blurb: "планы и намерения", cefr: "A2", status: "ready" },
  { id: "future-time", title: "Время в будущем", blurb: "when/if + present", cefr: "A2", status: "ready" },
  { id: "predictions", title: "Прогнозы", blurb: "will / might про будущее", cefr: "A2", status: "ready" },

  // Юнит 3 · Сравнение и количество
  { id: "comparatives", title: "Сравнительная степень", blurb: "bigger, more expensive", cefr: "A2", status: "soon" },
  { id: "superlatives", title: "Превосходная степень", blurb: "the biggest, the best", cefr: "A2", status: "soon" },
  { id: "quantifiers", title: "some / any / much / many", blurb: "сколько чего", cefr: "A2", status: "soon" },
  { id: "countable", title: "Исчисляемое и нет", blurb: "a lot of vs much", cefr: "A2", status: "soon" },

  // Юнит 4 · Опыт и советы
  { id: "present-perfect", title: "Present Perfect", blurb: "have done — опыт/результат", cefr: "A2", status: "soon" },
  { id: "perfect-vs-past", title: "Perfect vs Past", blurb: "have been vs was", cefr: "A2", status: "soon" },
  { id: "modals-advice", title: "should / must", blurb: "советы и долженствование", cefr: "A2", status: "soon" },
  { id: "adverbs-manner", title: "Наречия образа действия", blurb: "quickly, well, hard", cefr: "A2", status: "soon" },
];

export const A2_UNITS: CourseUnit[] = [
  { id: "a2-past", title: "Прошлое", subtitle: "Что было: Past Simple и Continuous", topicIds: ["past-simple", "past-irregular", "past-continuous", "used-to"] },
  { id: "a2-future", title: "Будущее и планы", subtitle: "will, going to, прогнозы", topicIds: ["future-will", "going-to", "future-time", "predictions"] },
  { id: "a2-compare", title: "Сравнение и количество", subtitle: "Степени сравнения, сколько чего", topicIds: ["comparatives", "superlatives", "quantifiers", "countable"] },
  { id: "a2-experience", title: "Опыт и советы", subtitle: "Present Perfect, модальные", topicIds: ["present-perfect", "perfect-vs-past", "modals-advice", "adverbs-manner"] },
];

export const A2_SECTION: CourseSection = {
  cefr: "A2",
  title: "A2 · Elementary",
  unitIds: A2_UNITS.map((u) => u.id),
};

// Весь курс: A1 + A2.
export const SECTIONS: CourseSection[] = [A1_SECTION, A2_SECTION];

// Плоские списки по всем секциям (для индексов/прогресса/карты).
export const ALL_TOPICS: CourseTopic[] = [...A1_TOPICS, ...A2_TOPICS];
export const ALL_UNITS: CourseUnit[] = [...A1_UNITS, ...A2_UNITS];

// ── Индексы для быстрого доступа ────────────────────────────────────────────
const TOPIC_BY_ID = new Map(ALL_TOPICS.map((t) => [t.id, t]));
const UNIT_BY_ID = new Map(ALL_UNITS.map((u) => [u.id, u]));

export function getTopic(id: string): CourseTopic | undefined {
  return TOPIC_BY_ID.get(id);
}
export function getUnit(id: string): CourseUnit | undefined {
  return UNIT_BY_ID.get(id);
}

/** Юниты секции по её cefr. */
export function unitsOfSection(section: CourseSection): CourseUnit[] {
  return section.unitIds
    .map((id) => UNIT_BY_ID.get(id))
    .filter((u): u is CourseUnit => !!u);
}

/** Все темы в линейном порядке прохождения (по всем юнитам всех секций). */
export function orderedTopics(): CourseTopic[] {
  return ALL_UNITS.flatMap((u) =>
    u.topicIds.map((id) => TOPIC_BY_ID.get(id)).filter((t): t is CourseTopic => !!t)
  );
}
