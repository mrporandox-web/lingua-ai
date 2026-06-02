// Движок стрика занятий — честная замена фейковому "🔥 7".
// Чистая функция над Gamification: считает, сколько дней ПОДРЯД ученик
// занимается. Без сайд-эффектов (тестируемо), сохранение — снаружи.
//
// Правило дня (по календарным дням, время игнорим):
//   - тот же день, что и lastActiveDate → no-op (за день стрик растёт один раз);
//   - ровно следующий день (вчера занимался) → streak + 1;
//   - первый раз (lastActiveDate пуст) → streak = 1;
//   - пропуск ≥ 2 дней → стрик обнулился, начинаем заново с 1.
// bestStreak ведёт личный рекорд (максимум за всё время).

import { dayKey, daysBetween } from "@/lib/srs";
import { withGamificationDefaults, type Gamification } from "@/lib/store/types";

/** Толерантно привести возможно-устаревшую запись к полному Gamification
 *  (старые профили без новых полей xp/цели — дополняем дефолтами). */
function normalize(g: Partial<Gamification> | null | undefined): Gamification {
  return withGamificationDefaults(g);
}

/**
 * Засчитать активность за день `todayIso` и вернуть обновлённый стрик.
 * Идемпотентна в пределах одного дня: повторный вызов в тот же день стрик
 * не двигает (важно — урок может проводиться несколько раз за день).
 *
 * @param prev    текущая геймификация (или undefined у старого профиля)
 * @param todayIso ISO-дата «сейчас» (берётся время — день вырезаем сами)
 */
export function bumpStreak(
  prev: Partial<Gamification> | null | undefined,
  todayIso: string
): Gamification {
  const g = normalize(prev);
  const today = dayKey(todayIso);

  // первый день занятий за всю историю профиля
  if (!g.lastActiveDate) {
    return { ...g, streak: 1, bestStreak: Math.max(1, g.bestStreak), lastActiveDate: today };
  }

  const gap = daysBetween(g.lastActiveDate, todayIso);

  // тот же календарный день — за день засчитываем ровно раз
  if (gap <= 0) return g;

  // вчера занимался → стрик продолжается; иначе (пропуск ≥ 2 дней) — заново
  const nextStreak = gap === 1 ? g.streak + 1 : 1;

  return {
    ...g,
    streak: nextStreak,
    bestStreak: Math.max(nextStreak, g.bestStreak),
    lastActiveDate: today,
  };
}
