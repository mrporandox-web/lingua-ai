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

  // Юнит 3 · Сравнение и количество — наполнен (status: ready)
  { id: "comparatives", title: "Сравнительная степень", blurb: "bigger, more expensive", cefr: "A2", status: "ready" },
  { id: "superlatives", title: "Превосходная степень", blurb: "the biggest, the best", cefr: "A2", status: "ready" },
  { id: "quantifiers", title: "some / any / much / many", blurb: "сколько чего", cefr: "A2", status: "ready" },
  { id: "countable", title: "Исчисляемое и нет", blurb: "a lot of vs much", cefr: "A2", status: "ready" },

  // Юнит 4 · Опыт и советы — наполнен (status: ready)
  { id: "present-perfect", title: "Present Perfect", blurb: "have done — опыт/результат", cefr: "A2", status: "ready" },
  { id: "perfect-vs-past", title: "Perfect vs Past", blurb: "have been vs was", cefr: "A2", status: "ready" },
  { id: "modals-advice", title: "should / must", blurb: "советы и долженствование", cefr: "A2", status: "ready" },
  { id: "adverbs-manner", title: "Наречия образа действия", blurb: "quickly, well, hard", cefr: "A2", status: "ready" },
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

// ══ Уровень B1 ═══════════════════════════════════════════════════════════════
// Юнит 1 «Условия и желания» наполнен; остальные — скелет под наполнение.
export const B1_TOPICS: CourseTopic[] = [
  // Юнит 1 · Условия и желания
  { id: "zero-conditional", title: "Zero Conditional", blurb: "общие истины: if + present", cefr: "B1", status: "ready" },
  { id: "second-conditional", title: "Second Conditional", blurb: "гипотеза: if + past, would", cefr: "B1", status: "ready" },
  { id: "wish-past", title: "I wish", blurb: "сожаления: wish + past", cefr: "B1", status: "ready" },
  { id: "unless", title: "unless", blurb: "«если не»", cefr: "B1", status: "ready" },

  // Юнит 2 · Времена Perfect
  { id: "present-perfect-continuous", title: "Present Perfect Continuous", blurb: "have been doing", cefr: "B1", status: "soon" },
  { id: "past-perfect", title: "Past Perfect", blurb: "had done — до прошлого", cefr: "B1", status: "soon" },
  { id: "for-since", title: "for / since", blurb: "длительность и точка отсчёта", cefr: "B1", status: "soon" },
  { id: "just-already-yet", title: "just / already / yet", blurb: "маркеры перфекта", cefr: "B1", status: "soon" },

  // Юнит 3 · Пассив и косвенная речь
  { id: "passive-present", title: "Пассив (настоящее)", blurb: "is made, are built", cefr: "B1", status: "soon" },
  { id: "passive-past", title: "Пассив (прошлое)", blurb: "was made, were built", cefr: "B1", status: "soon" },
  { id: "reported-speech", title: "Косвенная речь", blurb: "he said that…", cefr: "B1", status: "soon" },
  { id: "reported-questions", title: "Косвенные вопросы", blurb: "asked if / where", cefr: "B1", status: "soon" },

  // Юнит 4 · Герундий и связки
  { id: "gerund-infinitive", title: "Герундий и инфинитив", blurb: "enjoy doing / want to do", cefr: "B1", status: "soon" },
  { id: "relative-clauses", title: "Относительные придаточные", blurb: "who, which, that", cefr: "B1", status: "soon" },
  { id: "modals-deduction", title: "must / can't (логика)", blurb: "must be, can't be", cefr: "B1", status: "soon" },
  { id: "so-such", title: "so / such", blurb: "усиление: so big, such a…", cefr: "B1", status: "soon" },
];

export const B1_UNITS: CourseUnit[] = [
  { id: "b1-conditions", title: "Условия и желания", subtitle: "Conditionals, wish, unless", topicIds: ["zero-conditional", "second-conditional", "wish-past", "unless"] },
  { id: "b1-perfect", title: "Времена Perfect", subtitle: "Perfect Continuous, Past Perfect", topicIds: ["present-perfect-continuous", "past-perfect", "for-since", "just-already-yet"] },
  { id: "b1-passive", title: "Пассив и косвенная речь", subtitle: "Passive voice, reported speech", topicIds: ["passive-present", "passive-past", "reported-speech", "reported-questions"] },
  { id: "b1-structures", title: "Герундий и связки", subtitle: "Gerund/infinitive, relative clauses", topicIds: ["gerund-infinitive", "relative-clauses", "modals-deduction", "so-such"] },
];

export const B1_SECTION: CourseSection = {
  cefr: "B1",
  title: "B1 · Intermediate",
  unitIds: B1_UNITS.map((u) => u.id),
};

// Весь курс: A1 + A2 + B1.
export const SECTIONS: CourseSection[] = [A1_SECTION, A2_SECTION, B1_SECTION];

// Плоские списки по всем секциям (для индексов/прогресса/карты).
export const ALL_TOPICS: CourseTopic[] = [...A1_TOPICS, ...A2_TOPICS, ...B1_TOPICS];
export const ALL_UNITS: CourseUnit[] = [...A1_UNITS, ...A2_UNITS, ...B1_UNITS];

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
