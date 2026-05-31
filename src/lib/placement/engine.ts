// Чистый движок диагностики уровня (Блок A из docs/CONCEPT.md).
// Адаптивный placement-тест: верный ответ → следующий вопрос сложнее,
// промах → проще + тема уходит в слабые. На выходе — CEFR + точность + слабые темы.
// Без сети/DOM: всё детерминированные функции над состоянием (тестируется как движок).

import type { CefrLevel, WeakTopic } from "@/lib/store/types";

/** Один вопрос диагностики. */
export interface PlacementQuestion {
  id: string;
  lvl: CefrLevel;
  topic: string; // тема грамматики, уходит в weakTopics при промахе
  q: string; // текст вопроса (англ.)
  opts: string[]; // варианты ответа
  answer: number; // индекс верного варианта в opts
}

/** Порядок уровней от простого к сложному (индекс = «сложность»). */
export const LVL_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

/** Сколько вопросов даём за прогон диагностики. */
export const MAX_QUESTIONS = 7;

/**
 * Банк вопросов (порт из prototype/index.html, по 1–2 на уровень).
 * topic — это ключ слабой темы, совпадает с тематикой уроков.
 */
export const QUESTION_BANK: PlacementQuestion[] = [
  {
    id: "q-a1-tobe",
    lvl: "A1",
    topic: "to-be",
    q: "She ___ a teacher.",
    opts: ["is", "are", "am", "be"],
    answer: 0,
  },
  {
    id: "q-a1-articles",
    lvl: "A1",
    topic: "articles",
    q: "I have ___ apple.",
    opts: ["a", "an", "the", "—"],
    answer: 1,
  },
  {
    id: "q-a2-pastsimple",
    lvl: "A2",
    topic: "past-simple",
    q: "Yesterday we ___ to the cinema.",
    opts: ["go", "goes", "went", "gone"],
    answer: 2,
  },
  {
    id: "q-a2-comparatives",
    lvl: "A2",
    topic: "comparatives",
    q: "This box is ___ than that one.",
    opts: ["heavy", "heavier", "heaviest", "more heavy"],
    answer: 1,
  },
  {
    id: "q-b1-presentperfect",
    lvl: "B1",
    topic: "present-perfect",
    q: "I ___ already finished my homework.",
    opts: ["have", "has", "had", "am"],
    answer: 0,
  },
  {
    id: "q-b1-conditionals",
    lvl: "B1",
    topic: "first-conditional",
    q: "If it rains, we ___ at home.",
    opts: ["stay", "will stay", "stayed", "would stay"],
    answer: 1,
  },
  {
    id: "q-b2-passive",
    lvl: "B2",
    topic: "passive-voice",
    q: "The bridge ___ in 1920.",
    opts: ["built", "was built", "has built", "is building"],
    answer: 1,
  },
  {
    id: "q-b2-reported",
    lvl: "B2",
    topic: "reported-speech",
    q: "He said he ___ tired.",
    opts: ["is", "was", "will be", "has been"],
    answer: 1,
  },
  {
    id: "q-c1-inversion",
    lvl: "C1",
    topic: "inversion",
    q: "Never ___ such a beautiful sunset.",
    opts: ["I have seen", "have I seen", "I saw", "did I saw"],
    answer: 1,
  },
  {
    id: "q-c1-mixedcond",
    lvl: "C1",
    topic: "mixed-conditionals",
    q: "If I had studied medicine, I ___ a doctor now.",
    opts: ["will be", "would be", "would have been", "am"],
    answer: 1,
  },
];

/** Изменяемое состояние одного прогона диагностики (живёт в React/тесте). */
export interface PlacementState {
  lvlPtr: number; // указатель текущего уровня в LVL_ORDER
  correctStreak: number; // серия верных (для шага вверх)
  wrongStreak: number; // серия промахов
  asked: string[]; // id уже показанных вопросов
  weakTopics: string[]; // темы промахов (с возможными дублями — чистим на финише)
  correct: number; // всего верных ответов
}

/** Старт диагностики: начинаем с A1, всё пусто. */
export function startPlacement(): PlacementState {
  return {
    lvlPtr: 0,
    correctStreak: 0,
    wrongStreak: 0,
    asked: [],
    weakTopics: [],
    correct: 0,
  };
}

/**
 * Подобрать следующий вопрос под текущий уровень.
 * Сперва — неотвеченный на целевом уровне, иначе любой неотвеченный.
 * null → банк исчерпан (тоже сигнал к финишу).
 */
export function nextQuestion(state: PlacementState): PlacementQuestion | null {
  const target = LVL_ORDER[Math.min(state.lvlPtr, LVL_ORDER.length - 1)];
  const onLevel = QUESTION_BANK.find(
    (q) => q.lvl === target && !state.asked.includes(q.id)
  );
  if (onLevel) return onLevel;
  const any = QUESTION_BANK.find((q) => !state.asked.includes(q.id));
  return any ?? null;
}

/**
 * Зарегистрировать ответ и сдвинуть состояние (чистая функция → новый стейт).
 * Верно: +1 к серии, шаг вверх по уровню. Промах: тема в слабые, шаг вниз.
 */
export function answerQuestion(
  state: PlacementState,
  question: PlacementQuestion,
  correct: boolean
): PlacementState {
  const next: PlacementState = {
    ...state,
    asked: [...state.asked, question.id],
    weakTopics: [...state.weakTopics],
  };
  if (correct) {
    next.correct += 1;
    next.correctStreak += 1;
    next.wrongStreak = 0;
    // одного верного хватает, чтобы поднять планку (быстро находим потолок)
    if (next.lvlPtr < LVL_ORDER.length - 1) {
      next.lvlPtr += 1;
      next.correctStreak = 0;
    }
  } else {
    next.wrongStreak += 1;
    next.correctStreak = 0;
    next.weakTopics.push(question.topic);
    if (next.lvlPtr > 0) next.lvlPtr -= 1;
  }
  return next;
}

/** Диагностика окончена: набрали лимит вопросов или банк исчерпан. */
export function isPlacementDone(state: PlacementState): boolean {
  return state.asked.length >= MAX_QUESTIONS || nextQuestion(state) === null;
}

/** Итог диагностики, маппится в UserProfile (cefrLevel/skills/weakTopics). */
export interface PlacementResult {
  cefrLevel: CefrLevel;
  grammarAccuracy: number; // 0..100, в skills.grammar
  weakTopics: WeakTopic[]; // готовые записи профиля
}

/**
 * Свести прогон к результату.
 * Уровень — где остановился указатель (потолок, до которого дотянул ученик).
 * Точность — % верных от заданных. Слабые темы — уникальные промахи.
 */
export function finishPlacement(
  state: PlacementState,
  now: string
): PlacementResult {
  const reached = Math.max(0, Math.min(state.lvlPtr, LVL_ORDER.length - 1));
  const cefrLevel = LVL_ORDER[reached];
  const total = state.asked.length;
  const grammarAccuracy =
    total === 0 ? 0 : Math.round((state.correct / total) * 100);

  const uniqueTopics = [...new Set(state.weakTopics)];
  const weakTopics: WeakTopic[] = uniqueTopics.map((topic) => ({
    topic,
    weight: 1, // свежий промах — максимальный приоритет
    lastSeen: now,
    mastery: 0, // ещё не освоено
  }));

  return { cefrLevel, grammarAccuracy, weakTopics };
}
