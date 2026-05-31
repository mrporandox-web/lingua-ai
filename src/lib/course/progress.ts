// Прогресс по курсу — чистые функции над UserProfile. Без сайд-эффектов.
// Мастерство темы берём из profile.weakTopics[].mastery (его ведёт SRS/движок).
// Путь линейный: следующая ГОТОВАЯ тема открывается, когда предыдущая освоена.
// Темы-скелеты (soon) показываем, но войти нельзя — контент ещё генерим.

import type { UserProfile } from "@/lib/store/types";
import type { CourseTopic } from "./types";
import { orderedTopics, getUnit, A1_UNITS } from "./curriculum";

// Порог «освоено» — единый с движком памяти (retention важнее моментальной точности).
export const MASTERY_DONE = 0.8;

/** Состояние темы для UI карты. */
export type TopicState =
  | "done" // освоена (mastery ≥ порога)
  | "current" // доступна сейчас (первая неосвоенная готовая)
  | "locked" // готова, но ещё закрыта (идём по порядку)
  | "soon"; // скелет без контента

/** Мастерство темы 0..1 (0, если ещё не трогали). */
export function topicMastery(profile: UserProfile, topicId: string): number {
  const w = profile.weakTopics.find((t) => t.topic === topicId);
  return w ? Math.max(0, Math.min(1, w.mastery)) : 0;
}

/**
 * Состояния всех тем за один проход. Линейная разблокировка считается
 * ТОЛЬКО по готовым темам (soon не блокируют доступ к ready-темам впереди).
 */
export function topicStates(profile: UserProfile): Map<string, TopicState> {
  const states = new Map<string, TopicState>();
  let currentTaken = false; // уже назначили «текущую» готовую тему?

  for (const t of orderedTopics()) {
    if (t.status === "soon") {
      states.set(t.id, "soon");
      continue;
    }
    // ready-тема
    if (topicMastery(profile, t.id) >= MASTERY_DONE) {
      states.set(t.id, "done");
      continue;
    }
    if (!currentTaken) {
      states.set(t.id, "current");
      currentTaken = true;
    } else {
      states.set(t.id, "locked");
    }
  }
  return states;
}

/** Можно ли начать тему сейчас (current). */
export function isTopicPlayable(state: TopicState | undefined): boolean {
  return state === "current" || state === "done";
}

/** Прогресс юнита: сколько тем освоено из всех. */
export function unitProgress(
  profile: UserProfile,
  unitId: string
): { done: number; total: number } {
  const unit = getUnit(unitId);
  if (!unit) return { done: 0, total: 0 };
  const done = unit.topicIds.filter(
    (id) => topicMastery(profile, id) >= MASTERY_DONE
  ).length;
  return { done, total: unit.topicIds.length };
}

/** Прогресс всего курса (по освоенным темам). */
export function courseProgress(profile: UserProfile): {
  done: number;
  total: number;
} {
  const topics: CourseTopic[] = orderedTopics();
  const done = topics.filter(
    (t) => topicMastery(profile, t.id) >= MASTERY_DONE
  ).length;
  return { done, total: topics.length };
}

/** Доля готового контента в курсе (ready / всего) — для честной коммуникации. */
export function readyShare(): { ready: number; total: number } {
  const total = A1_UNITS.reduce((n, u) => n + u.topicIds.length, 0);
  const ready = orderedTopics().filter((t) => t.status === "ready").length;
  return { ready, total };
}
