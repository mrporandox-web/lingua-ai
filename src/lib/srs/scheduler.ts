// Spaced repetition scheduler — кривая забывания (docs/CONCEPT.md §3 Блок D).
// SM-2 lite: чистые функции над SrsItem. Решают, КОГДА снова показать тему,
// и какие темы «созрели» (due) к повтору. Сохранение очереди — снаружи,
// через ProfileStore. Без сайд-эффектов (тестируемо).

import type { ConceptId, SrsItem } from "@/lib/store/types";

// Стартовый фактор лёгкости (SM-2 канон ~2.5).
export const START_EASE = 2.5;
// Минимальный ease — ниже не опускаем, иначе интервалы схлопываются.
const MIN_EASE = 1.3;
// Первые два успешных повтора — фиксированные интервалы (как в Anki).
const FIRST_INTERVAL = 1; // день
const SECOND_INTERVAL = 3; // дня
// Корректировки ease на оценку (грубая SM-2: только pass/fail).
const EASE_BONUS_PASS = 0.0; // pass держит ease; рост даёт интервал, не ease
const EASE_PENALTY_FAIL = 0.2; // промах слегка снижает лёгкость

const DAY_MS = 24 * 60 * 60 * 1000;

/** Дата+N дней в ISO. */
function addDaysIso(fromIso: string, days: number): string {
  return new Date(new Date(fromIso).getTime() + days * DAY_MS).toISOString();
}

/** YYYY-MM-DD из ISO (для сравнения «тот же день / назавтра» без времени). */
export function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

/** Разница в полных календарных днях между двумя ISO-датами (b - a). */
export function daysBetween(aIso: string, bIso: string): number {
  const a = new Date(dayKey(aIso)).getTime();
  const b = new Date(dayKey(bIso)).getTime();
  return Math.round((b - a) / DAY_MS);
}

/** Новая SRS-запись для впервые встреченной темы. */
export function newSrsItem(
  item: string,
  concept: ConceptId,
  now: string
): SrsItem {
  return {
    item,
    dueDate: now, // доступна сразу
    ease: START_EASE,
    interval: 0,
    reps: 0,
    lastConcept: concept,
    lastReviewed: now,
    retentionScored: false,
  };
}

/**
 * Применить результат повтора (SM-2 lite).
 * @param prev    прежняя запись (или undefined — впервые)
 * @param concept какой концепцией показали в этот раз
 * @param correct верно ли ответил
 * @param now     ISO-метка момента
 * Возвращает НОВУЮ запись (исходная не мутируется).
 */
export function gradeItem(
  prev: SrsItem | undefined,
  args: { item: string; concept: ConceptId; correct: boolean; now: string }
): SrsItem {
  const { item, concept, correct, now } = args;

  if (!prev) {
    const base = newSrsItem(item, concept, now);
    return advance(base, correct, now);
  }
  // обновляем «что показали» до пересчёта расписания
  const carried: SrsItem = {
    ...prev,
    lastConcept: concept,
    lastReviewed: now,
  };
  return advance(carried, correct, now);
}

/** Пересчёт ease/interval/dueDate/reps по результату. */
function advance(s: SrsItem, correct: boolean, now: string): SrsItem {
  if (!correct) {
    // промах: повтор сегодня, лёгкость слегка вниз, серия сброшена.
    const ease = Math.max(MIN_EASE, s.ease - EASE_PENALTY_FAIL);
    return {
      ...s,
      ease,
      interval: 0,
      reps: 0,
      dueDate: now, // снова в работу прямо сейчас
      retentionScored: false, // новый цикл удержания
    };
  }

  const reps = s.reps + 1;
  let interval: number;
  if (reps === 1) interval = FIRST_INTERVAL;
  else if (reps === 2) interval = SECOND_INTERVAL;
  else interval = Math.round(s.interval * s.ease);

  const ease = Math.max(MIN_EASE, s.ease + EASE_BONUS_PASS);
  return {
    ...s,
    ease,
    interval,
    reps,
    dueDate: addDaysIso(now, interval),
    retentionScored: false, // следующий возврат снова можно зачесть в retention
  };
}

/** Созрела ли запись к повтору на момент now. */
export function isDue(s: SrsItem, now: string): boolean {
  return new Date(s.dueDate).getTime() <= new Date(now).getTime();
}

/** Все созревшие записи, раньше due — выше (по dueDate возр.). */
export function dueItems(queue: SrsItem[], now: string): SrsItem[] {
  return queue
    .filter((s) => isDue(s, now))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

/** Найти запись по id темы. */
export function findSrs(queue: SrsItem[], item: string): SrsItem | undefined {
  return queue.find((s) => s.item === item);
}

/** Вставить/заменить запись в очереди (по item-id), вернуть новую очередь. */
export function upsertSrs(queue: SrsItem[], next: SrsItem): SrsItem[] {
  const i = queue.findIndex((s) => s.item === next.item);
  if (i < 0) return [...queue, next];
  const copy = [...queue];
  copy[i] = next;
  return copy;
}
