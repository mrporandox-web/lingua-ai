// XP и дневная цель — ядро удержания (главный рычаг против Duolingo по ресёрчу).
// Чистые функции над Gamification, без сайд-эффектов. День определяем по YYYY-MM-DD.

import {
  withGamificationDefaults,
  type Gamification,
} from "@/lib/store/types";

/** XP за верный ответ. */
export const XP_PER_CORRECT = 10;
/** Бонус за завершённый урок. */
export const XP_LESSON_BONUS = 20;

/** Дата YYYY-MM-DD из ISO-времени (локальный день). */
export function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Начислить XP. Обновляет суммарный xp, дневной dailyXp (со сбросом в новый
 * день) и недельный weeklyXp (для будущих лиг). Возвращает НОВЫЙ объект.
 */
export function awardXp(
  g: Gamification | null | undefined,
  amount: number,
  todayKey: string
): Gamification {
  const base = withGamificationDefaults(g);
  const sameDay = base.dailyXpDate === todayKey;
  return {
    ...base,
    xp: base.xp + amount,
    dailyXp: (sameDay ? base.dailyXp : 0) + amount,
    dailyXpDate: todayKey,
    weeklyXp: base.weeklyXp + amount,
  };
}

export interface DailyProgress {
  done: number; // XP сегодня
  goal: number; // цель XP на день
  pct: number; // 0..100
  met: boolean; // цель достигнута
}

/** Прогресс дневной цели (с учётом сброса на новый день). */
export function dailyProgress(
  g: Gamification | null | undefined,
  todayKey: string
): DailyProgress {
  const base = withGamificationDefaults(g);
  const done = base.dailyXpDate === todayKey ? base.dailyXp : 0;
  const goal = base.dailyGoal > 0 ? base.dailyGoal : 1;
  const pct = Math.min(100, Math.round((done / goal) * 100));
  return { done, goal, pct, met: done >= goal };
}
