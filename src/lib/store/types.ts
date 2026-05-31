// Модель данных ученика (Learner Model). Отражает docs/CONCEPT.md §3 Блок B.
// Это контракт слоя данных: одинаков для localStorage и Supabase.

/** CEFR-уровень владения языком. */
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** Концепции подачи материала — ядро адаптивности. */
export type ConceptId =
  | "rule-first" // формула → примеры → практика
  | "examples-first" // много примеров → юзер сам выводит правило
  | "context-story" // тема внутри диалога/ситуации
  | "contrast-native"; // сравнение «как в русском vs как в английском»

export const ALL_CONCEPTS: ConceptId[] = [
  "rule-first",
  "examples-first",
  "context-story",
  "contrast-native",
];

/** Навыки ученика, 0..100. */
export interface Skills {
  grammar: number;
  vocab: number;
  listening: number;
  reading: number;
  speaking: number;
}

/** Слабая тема с весом и прогрессом освоения. */
export interface WeakTopic {
  topic: string; // напр. "present-continuous"
  weight: number; // приоритет (0..1)
  lastSeen: string | null; // ISO-дата последнего показа
  mastery: number; // освоение 0..1
}

/** Накопленный сигнал по одной концепции (для выбора рабочей). */
export interface ConceptScore {
  accuracy: number; // моментальный % правильных, 0..1
  retentionD1: number; // удержание через 1 день, 0..1
  n: number; // число сессий накопления (анти-шум: решаем после 3–5)
}

/** Запись в очереди spaced repetition (SM-2 / Anki). */
export interface SrsItem {
  item: string; // id слова/правила/паттерна
  dueDate: string; // ISO-дата следующего показа
  ease: number; // фактор лёгкости (SM-2, старт ~2.5)
  interval: number; // интервал в днях
  reps: number; // число успешных повторов подряд
  lastConcept: ConceptId; // какой концепцией показывали в прошлый раз (мостик к движку памяти)
  lastReviewed: string; // ISO-дата прошлого показа (нужно для retentionD1: «вернулся назавтра?»)
  retentionScored: boolean; // уже зачли retentionD1 за этот возврат (чтобы не двоить сигнал)
}

/** Полный профиль ученика — корневая запись на юзера. */
export interface UserProfile {
  id: string; // анонимный id (uuid)
  createdAt: string; // ISO
  updatedAt: string; // ISO
  onboarded: boolean; // прошёл онбординг
  goal: string | null; // цель/мотивация (свободный текст)
  cefrLevel: CefrLevel | null; // null до диагностики
  skills: Skills;
  weakTopics: WeakTopic[];
  preferredConcept: ConceptId | null; // null пока сигнал не накоплен
  conceptScores: Record<ConceptId, ConceptScore>;
  srsQueue: SrsItem[];
}

/** Дефолтный пустой score по концепции. */
export function emptyConceptScore(): ConceptScore {
  return { accuracy: 0, retentionD1: 0, n: 0 };
}

/** Дефолтные навыки нового ученика (всё с нуля до диагностики). */
export function emptySkills(): Skills {
  return { grammar: 0, vocab: 0, listening: 0, reading: 0, speaking: 0 };
}

/** Создать чистый профиль нового анонимного ученика. */
export function createEmptyProfile(id: string, now: string): UserProfile {
  return {
    id,
    createdAt: now,
    updatedAt: now,
    onboarded: false,
    goal: null,
    cefrLevel: null,
    skills: emptySkills(),
    weakTopics: [],
    preferredConcept: null,
    conceptScores: {
      "rule-first": emptyConceptScore(),
      "examples-first": emptyConceptScore(),
      "context-story": emptyConceptScore(),
      "contrast-native": emptyConceptScore(),
    },
    srsQueue: [],
  };
}
