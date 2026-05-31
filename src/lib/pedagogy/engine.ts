// Движок концепций подачи — ядро адаптивности (docs/CONCEPT.md §3 Блок C).
// Чистые функции над UserProfile: выбрать, КАК объяснять этому ученику,
// и записать сигнал по итогам ответа. Без сайд-эффектов (тестируемо);
// сохранение профиля — снаружи, через ProfileStore.

import {
  ALL_CONCEPTS,
  emptyConceptScore,
  type ConceptId,
  type ConceptScore,
  type UserProfile,
} from "@/lib/store/types";

// Сколько сессий копим, прежде чем закрепить рабочую концепцию (анти-шум).
export const MIN_SESSIONS_TO_LOCK = 3;
// Доля «исследования» уже после закрепления — изредка пробуем другое.
export const EXPLORE_EPSILON = 0.15;
// Вес удержания против моментальной точности при оценке концепции.
// retention честнее: ловит «понял на минуту vs запомнил».
const W_RETENTION = 0.65;
const W_ACCURACY = 0.35;

/** Итоговый балл концепции: взвешенная сумма (удержание важнее точности). */
export function conceptValue(s: ConceptScore): number {
  return W_ACCURACY * s.accuracy + W_RETENTION * s.retentionD1;
}

/**
 * Выбрать концепцию для показа.
 * @param profile профиль ученика (источник накопленного сигнала)
 * @param available какие концепции реально есть для текущей темы
 * @param rnd     генератор 0..1 (по умолчанию Math.random; в тестах — фиксируем)
 */
export function pickConcept(
  profile: UserProfile,
  available: ConceptId[],
  rnd: () => number = Math.random
): ConceptId {
  const pool = available.length ? available : ALL_CONCEPTS;

  // 1) Пока сигнал не накоплен — добираем наименее опробованную концепцию.
  //    Это «фаза разведки»: каждую надо показать хоть несколько раз.
  const leastTried = pickLeastTried(profile, pool);
  const lockedYet =
    profile.preferredConcept !== null &&
    pool.includes(profile.preferredConcept) &&
    scoreOf(profile, profile.preferredConcept).n >= MIN_SESSIONS_TO_LOCK;

  if (!lockedYet) {
    return leastTried;
  }

  // 2) Концепция закреплена — преимущественно ведём ей, но ε% исследуем.
  if (rnd() < EXPLORE_EPSILON) {
    return leastTried;
  }
  return profile.preferredConcept as ConceptId;
}

/** Концепция из пула с наименьшим n (при равенстве — лучшая по баллу, затем порядок пула). */
function pickLeastTried(profile: UserProfile, pool: ConceptId[]): ConceptId {
  return [...pool].sort((a, b) => {
    const sa = scoreOf(profile, a);
    const sb = scoreOf(profile, b);
    if (sa.n !== sb.n) return sa.n - sb.n; // меньше показов — выше приоритет
    const va = conceptValue(sa);
    const vb = conceptValue(sb);
    if (va !== vb) return vb - va; // при равных показах — лучший балл
    return pool.indexOf(a) - pool.indexOf(b); // стабильный порядок
  })[0];
}

/**
 * Записать сигнал по итогам ответа в рамках одной сессии.
 * accuracy обновляется сразу; retentionD1 проставляется отдельно (на след. день).
 * Возвращает НОВЫЙ профиль (исходный не мутируется).
 */
export function recordSignal(
  profile: UserProfile,
  args: { concept: ConceptId; correct: boolean }
): UserProfile {
  const prev = scoreOf(profile, args.concept);
  const n = prev.n + 1;
  // Накопительное среднее точности: новое = старое*(n-1)/n + результат/n.
  const hit = args.correct ? 1 : 0;
  const accuracy = (prev.accuracy * prev.n + hit) / n;

  const nextScore: ConceptScore = {
    accuracy,
    retentionD1: prev.retentionD1, // обновится отдельной проводкой позже
    n,
  };

  const conceptScores = {
    ...profile.conceptScores,
    [args.concept]: nextScore,
  };

  return {
    ...profile,
    conceptScores,
    preferredConcept: recomputePreferred(conceptScores),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Записать удержание (retentionD1) по концепции — отдельная проводка,
 * выполняется при возврате к теме на следующий день (сигнал «запомнил vs понял»).
 * remembered: верно ли ответил на повторе. Накопительное среднее, как accuracy.
 * НЕ трогает accuracy/n (это удержание прошлого показа, не новая сессия).
 * Возвращает НОВЫЙ профиль.
 */
export function recordRetention(
  profile: UserProfile,
  args: { concept: ConceptId; remembered: boolean }
): UserProfile {
  const prev = scoreOf(profile, args.concept);
  if (prev.n === 0) return profile; // нечего удерживать — показа ещё не было

  const hit = args.remembered ? 1 : 0;
  // среднее удержание по числу уже накопленных сессий концепции
  const retentionD1 = (prev.retentionD1 * (prev.n - 1) + hit) / prev.n;

  const nextScore: ConceptScore = { ...prev, retentionD1 };
  const conceptScores = {
    ...profile.conceptScores,
    [args.concept]: nextScore,
  };

  return {
    ...profile,
    conceptScores,
    preferredConcept: recomputePreferred(conceptScores),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Пересчитать рабочую концепцию: лидер по баллу среди тех, что прошли
 * минимум сессий. Пока никто не дотянул до порога — preferred остаётся null.
 */
function recomputePreferred(
  scores: Record<ConceptId, ConceptScore>
): ConceptId | null {
  const eligible = ALL_CONCEPTS.filter(
    (c) => scores[c].n >= MIN_SESSIONS_TO_LOCK
  );
  if (!eligible.length) return null;
  return eligible.sort(
    (a, b) => conceptValue(scores[b]) - conceptValue(scores[a])
  )[0];
}

/** Безопасный доступ к score концепции (с дефолтом). */
function scoreOf(profile: UserProfile, concept: ConceptId): ConceptScore {
  return profile.conceptScores[concept] ?? emptyConceptScore();
}
