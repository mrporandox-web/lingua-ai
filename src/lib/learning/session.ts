// Сервис обучения — оркестратор Фазы 2 (docs/CONCEPT.md §3, Блоки C+D).
//
// Связывает ЧИСТЫЕ функции движка (pedagogy/srs) с PERSISTENCE (ProfileStore)
// и потоком событий (EventLog). Сам по себе сайд-эффектный (грузит/пишет
// профиль), но всю «математику» делегирует чистым функциям — их тестируем
// отдельно, без сети.
//
// Поток одного урока:
//   1) startSession(topic, available) — выбрать КАК объяснять этому ученику.
//   2) показать материал выбранной концепцией (UI).
//   3) submitAnswer(...) — записать результат: сигнал концепции + SRS + событие.
//   4) (на следующий день при возврате к теме) scoreRetention(...) —
//      зачесть удержание «понял на минуту vs запомнил».
//
// Бэкенд (Supabase/localStorage) и логгер событий выбираются под капотом —
// сервис не знает, какой активен. Передаются и через DI (тесты/SSR).

import { getEventLog, type EventLog } from "@/lib/store/eventLog";
import { getProfileStore, type ProfileStore } from "@/lib/store";
import type { ConceptId, UserProfile } from "@/lib/store/types";
import { ALL_CONCEPTS } from "@/lib/store/types";
import {
  MIN_SESSIONS_TO_LOCK,
  pickConcept,
  recordRetention,
  recordSignal,
} from "@/lib/pedagogy";
import {
  daysBetween,
  findSrs,
  gradeItem,
  upsertSrs,
} from "@/lib/srs";
import { bumpStreak, awardXp, dayKey, XP_PER_CORRECT } from "@/lib/gamification";

/** Что сервис отдаёт UI на старте сессии: какой темой и какой концепцией вести. */
export interface SessionPlan {
  topic: string;
  concept: ConceptId; // выбранная концепция подачи
  profile: UserProfile; // актуальный профиль (UI может показать прогресс)
}

/** Результат проводки ответа: обновлённый профиль (UI рендерит новый прогресс). */
export interface AnswerResult {
  profile: UserProfile;
  concept: ConceptId;
  correct: boolean;
}

/** Зависимости сервиса. По умолчанию — боевые синглтоны; в тестах подменяемы. */
export interface LearningDeps {
  store?: ProfileStore;
  events?: EventLog;
  rnd?: () => number;
  now?: () => string;
}

function resolve(deps: LearningDeps) {
  return {
    store: deps.store ?? getProfileStore(),
    events: deps.events ?? getEventLog(),
    rnd: deps.rnd ?? Math.random,
    now: deps.now ?? (() => new Date().toISOString()),
  };
}

/**
 * Начать сессию по теме: выбрать концепцию подачи под этого ученика.
 * Грузит (или создаёт) профиль и прогоняет накопленный сигнал через pickConcept.
 *
 * @param topic     id темы (напр. "present-continuous")
 * @param available какие концепции реально доступны для темы (есть контент).
 *                  Пусто → берём все (движок сам разрулит по сигналу).
 */
export async function startSession(
  topic: string,
  available: ConceptId[] = ALL_CONCEPTS,
  deps: LearningDeps = {}
): Promise<SessionPlan> {
  const { store, rnd } = resolve(deps);
  const profile = await store.getOrCreate();
  const concept = pickConcept(profile, available, rnd);
  return { topic, concept, profile };
}

/**
 * Засчитать «ученик занимался сегодня» и обновить стрик занятий.
 * Идемпотентно за день (bumpStreak не двигает стрик при повторном заходе),
 * поэтому безопасно звать на каждый успешный ответ. Возвращает свежий профиль.
 *
 * Это честная замена фейковому «🔥 7» в UI: число берётся из реальной истории
 * дней, а не из захардкоженной константы.
 */
export async function recordActivity(
  deps: LearningDeps = {}
): Promise<UserProfile> {
  const { store, now } = resolve(deps);
  const ts = now();
  const current = await store.getOrCreate();
  const gamification = bumpStreak(current.gamification, ts);
  const next: UserProfile = { ...current, gamification, updatedAt: ts };
  await store.save(next);
  return next;
}

/**
 * Пометить, что «вау-момент» закрепления концепции уже показан ученику.
 * Ставит conceptRevealedAt = сейчас (один раз за жизнь профиля). Идемпотентно:
 * если уже стоит — ничего не меняет. Возвращает свежий профиль.
 */
export async function markConceptRevealed(
  deps: LearningDeps = {}
): Promise<UserProfile> {
  const { store, now } = resolve(deps);
  const current = await store.getOrCreate();
  if (current.conceptRevealedAt) return current; // уже показывали
  const ts = now();
  const next: UserProfile = { ...current, conceptRevealedAt: ts, updatedAt: ts };
  await store.save(next);
  return next;
}

/**
 * Калибровка подхода в онбординге: ученик выбрал концепцию, которая «зашла».
 * Закрепляем её как рабочую СРАЗУ (до накопления сигнала в уроках) — это
 * первичный замер, который движок дальше уточняет по реальным ответам.
 *
 * Чтобы выбор «прилип» и не обнулился первым же recordSignal (тот пересчитывает
 * preferredConcept по conceptScores), сеем счёт выбранной концепции на порог
 * закрепления: n = MIN_SESSIONS_TO_LOCK, высокая стартовая точность. Тогда она
 * единственная «eligible» и остаётся рабочей, пока реальные уроки не докрутят.
 * Заодно ставим conceptRevealedAt (вау-момент показан) и onboarded.
 */
export async function calibrateConcept(
  concept: ConceptId,
  deps: LearningDeps = {}
): Promise<UserProfile> {
  const { store, now } = resolve(deps);
  const ts = now();
  const current = await store.getOrCreate();

  // сид: «ты заметно лучше справляешься с этой подачей» (уточнится в уроках)
  const seeded = {
    accuracy: 0.9,
    retentionD1: 0,
    n: MIN_SESSIONS_TO_LOCK,
  };
  const conceptScores = { ...current.conceptScores, [concept]: seeded };

  const next: UserProfile = {
    ...current,
    conceptScores,
    preferredConcept: concept,
    conceptRevealedAt: current.conceptRevealedAt ?? ts,
    onboarded: true,
    updatedAt: ts,
  };
  await store.save(next);
  return next;
}

/**
 * Записать результат ответа в рамках сессии. Делает три вещи атомарно
 * (с т.з. одного сохранения профиля):
 *   1) recordSignal     — обновить accuracy концепции + пересчитать preferred.
 *   2) gradeItem (SRS)   — пересчитать расписание повтора темы.
 *   3) eventLog.append   — зафиксировать событие в поток (Supabase/no-op).
 * Затем сохраняет профиль целиком.
 *
 * Возвращает обновлённый профиль.
 */
export async function submitAnswer(
  args: {
    topic: string;
    item: string; // id конкретного айтема внутри темы
    concept: ConceptId; // какой концепцией показывали (из startSession)
    correct: boolean;
    payload?: Record<string, unknown>; // доп. контекст для аналитики
  },
  deps: LearningDeps = {}
): Promise<AnswerResult> {
  const { store, events, now } = resolve(deps);
  const ts = now();

  const current = await store.getOrCreate();

  // 1) сигнал концепции (accuracy + пересчёт рабочей концепции)
  const afterSignal = recordSignal(current, {
    concept: args.concept,
    correct: args.correct,
  });

  // 2) SRS-расписание темы (когда показать снова)
  const prevSrs = findSrs(afterSignal.srsQueue, args.item);
  const nextSrs = gradeItem(prevSrs, {
    item: args.item,
    concept: args.concept,
    correct: args.correct,
    now: ts,
  });
  // XP за верный ответ (геймификация удержания: суммарный + дневная цель)
  const gamification = args.correct
    ? awardXp(afterSignal.gamification, XP_PER_CORRECT, dayKey(ts))
    : afterSignal.gamification;

  const next: UserProfile = {
    ...afterSignal,
    srsQueue: upsertSrs(afterSignal.srsQueue, nextSrs),
    gamification,
    updatedAt: ts,
  };

  // 3) поток событий (не роняет урок при сбое — см. EventLog)
  await events.append({
    topic: args.topic,
    concept: args.concept,
    item: args.item,
    correct: args.correct,
    payload: args.payload,
  });

  await store.save(next);
  return { profile: next, concept: args.concept, correct: args.correct };
}

/**
 * Зачесть удержание (retentionD1) при возврате к теме.
 * Вызывать, когда ученик повторно отвечает на ранее показанный айтем
 * НА СЛЕДУЮЩИЙ ДЕНЬ (или позже). Считает сигнал «запомнил vs понял на минуту»
 * по той концепции, которой показывали в прошлый раз (srsItem.lastConcept).
 *
 * Защита от двойного счёта: retentionScored на SRS-записи. Зачитываем ровно
 * один раз за цикл; gradeItem сбрасывает флаг на следующем повторе.
 *
 * No-op (возвращает текущий профиль), если:
 *   - айтема нет в очереди (его ещё не показывали);
 *   - возврат в тот же день (нет интервала забывания — нечего мерить);
 *   - retention за этот цикл уже зачтён.
 */
export async function scoreRetention(
  args: { item: string; remembered: boolean },
  deps: LearningDeps = {}
): Promise<UserProfile> {
  const { store, now } = resolve(deps);
  const ts = now();

  const current = await store.getOrCreate();
  const srs = findSrs(current.srsQueue, args.item);
  if (!srs) return current; // тему ещё не показывали
  if (srs.retentionScored) return current; // уже зачли за этот цикл
  if (daysBetween(srs.lastReviewed, ts) < 1) return current; // тот же день — не меряем

  // удержание считаем по концепции прошлого показа
  const afterRetention = recordRetention(current, {
    concept: srs.lastConcept,
    remembered: args.remembered,
  });

  // помечаем SRS-запись как зачтённую (анти-двойной счёт)
  const markedSrs = { ...srs, retentionScored: true };
  const next: UserProfile = {
    ...afterRetention,
    srsQueue: upsertSrs(afterRetention.srsQueue, markedSrs),
    updatedAt: ts,
  };

  await store.save(next);
  return next;
}
