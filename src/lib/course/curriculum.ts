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

  // Юнит 2 · О себе и людях
  { id: "present-simple", title: "Present Simple", blurb: "регулярные действия: I work", cefr: "A1", status: "soon" },
  { id: "have-got", title: "have / has got", blurb: "что у тебя есть", cefr: "A1", status: "soon" },
  { id: "possessives", title: "Притяжательные", blurb: "my, your, his, her", cefr: "A1", status: "soon" },
  { id: "this-that", title: "this / that / these / those", blurb: "этот и тот", cefr: "A1", status: "soon" },

  // Юнит 3 · Прямо сейчас
  { id: "present-continuous", title: "Present Continuous", blurb: "действие сейчас: am/is/are + -ing", cefr: "A1", status: "ready" },
  { id: "there-is", title: "there is / there are", blurb: "есть / находится", cefr: "A1", status: "soon" },
  { id: "prepositions-place", title: "Предлоги места", blurb: "in, on, at, under", cefr: "A1", status: "soon" },
  { id: "can-cant", title: "can / can't", blurb: "умение и возможность", cefr: "A1", status: "soon" },

  // Юнит 4 · Каждый день
  { id: "adverbs-frequency", title: "Наречия частоты", blurb: "always, usually, never", cefr: "A1", status: "soon" },
  { id: "like-ing", title: "like + -ing", blurb: "что нравится делать", cefr: "A1", status: "soon" },
  { id: "numbers-time", title: "Числа и время", blurb: "сколько времени, который час", cefr: "A1", status: "soon" },
  { id: "wh-questions", title: "Вопросы Wh-", blurb: "What, Where, When, Who", cefr: "A1", status: "soon" },
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

// Весь курс (пока только A1; A2+ добавим тем же паттерном).
export const SECTIONS: CourseSection[] = [A1_SECTION];

// ── Индексы для быстрого доступа ────────────────────────────────────────────
const TOPIC_BY_ID = new Map(A1_TOPICS.map((t) => [t.id, t]));
const UNIT_BY_ID = new Map(A1_UNITS.map((u) => [u.id, u]));

export function getTopic(id: string): CourseTopic | undefined {
  return TOPIC_BY_ID.get(id);
}
export function getUnit(id: string): CourseUnit | undefined {
  return UNIT_BY_ID.get(id);
}

/** Все темы в линейном порядке прохождения (по юнитам). */
export function orderedTopics(): CourseTopic[] {
  return A1_UNITS.flatMap((u) =>
    u.topicIds.map((id) => TOPIC_BY_ID.get(id)).filter((t): t is CourseTopic => !!t)
  );
}
