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

/** Тариф подписки. v1: free по умолчанию; premium — после оплаты. */
export type SubscriptionPlan = "free" | "premium";

/** Подписка ученика (биллинг подключим позже — пока статус ведём в профиле). */
export interface Subscription {
  plan: SubscriptionPlan;
  status: "none" | "trialing" | "active" | "canceled"; // состояние оплаты
  renewsAt: string | null; // ISO-дата следующего списания (null для free)
}

/** Геймификация — долгая история мотивации (стрик занятий по дням).
 *  Сердца в профиле НЕ держим: они про «текущую попытку урока», а не про
 *  историю — живут в локальном state экрана и сбрасываются каждым уроком. */
export interface Gamification {
  streak: number; // дней подряд с занятием
  bestStreak: number; // рекорд стрика (для «личного лучшего»)
  lastActiveDate: string | null; // YYYY-MM-DD последнего дня с занятием
  xp: number; // суммарный XP за всё время (мотивация прогресса)
  dailyXp: number; // XP, набранный сегодня
  dailyGoal: number; // цель XP на день (геймификация удержания)
  dailyXpDate: string | null; // YYYY-MM-DD, к какому дню относится dailyXp (сброс)
  // ── Лиги: задел на будущее, выключены пока нет аудитории (leagueTier=null) ──
  weeklyXp: number; // XP за неделю (для таблицы лиги)
  leagueTier: number | null; // тир лиги; null = лиги ещё не включены
}

/** Цель XP в день по умолчанию (как daily goal у Duolingo). */
export const DEFAULT_DAILY_GOAL = 30;

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
  name: string | null; // имя для обращения (спрашиваем при знакомстве); null до онбординга
  subscription: Subscription; // тариф/статус оплаты
  onboarded: boolean; // прошёл онбординг
  goal: string | null; // цель/мотивация (свободный текст)
  cefrLevel: CefrLevel | null; // null до диагностики
  skills: Skills;
  weakTopics: WeakTopic[];
  preferredConcept: ConceptId | null; // null пока сигнал не накоплен
  conceptScores: Record<ConceptId, ConceptScore>;
  // ISO-дата «вау-момента»: когда движок ВПЕРВЫЕ закрепил рабочую концепцию и
  // мы показали ученику reveal «мы поняли, как тебя учить». null = ещё не было.
  conceptRevealedAt: string | null;
  srsQueue: SrsItem[];
  gamification: Gamification; // стрик/рекорд занятий (мотивация)
}

/** Дефолтный пустой score по концепции. */
export function emptyConceptScore(): ConceptScore {
  return { accuracy: 0, retentionD1: 0, n: 0 };
}

/** Дефолтные навыки нового ученика (всё с нуля до диагностики). */
export function emptySkills(): Skills {
  return { grammar: 0, vocab: 0, listening: 0, reading: 0, speaking: 0 };
}

/** Дефолтная геймификация нового ученика (ещё ни дня не занимался). */
export function emptyGamification(): Gamification {
  return {
    streak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    xp: 0,
    dailyXp: 0,
    dailyGoal: DEFAULT_DAILY_GOAL,
    dailyXpDate: null,
    weeklyXp: 0,
    leagueTier: null,
  };
}

/** Дополнить геймификацию недостающими полями (толерантность к старым профилям). */
export function withGamificationDefaults(
  g: Partial<Gamification> | null | undefined
): Gamification {
  return { ...emptyGamification(), ...(g ?? {}) };
}

/** Дефолтная подписка нового ученика (бесплатный тариф, без оплаты). */
export function emptySubscription(): Subscription {
  return { plan: "free", status: "none", renewsAt: null };
}

/** Создать чистый профиль нового анонимного ученика. */
export function createEmptyProfile(id: string, now: string): UserProfile {
  return {
    id,
    createdAt: now,
    updatedAt: now,
    name: null,
    subscription: emptySubscription(),
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
    conceptRevealedAt: null,
    srsQueue: [],
    gamification: emptyGamification(),
  };
}
