// Юнит-тесты движка концепций (ядро адаптивности). Чистые функции —
// проверяем без сети/DOM: разведка → накопление сигнала → закрепление → ε-исследование.

import { describe, expect, it } from "vitest";
import {
  conceptValue,
  EXPLORE_EPSILON,
  MIN_SESSIONS_TO_LOCK,
  pickConcept,
  recordRetention,
  recordSignal,
} from "./engine";
import { ALL_CONCEPTS, createEmptyProfile } from "@/lib/store/types";
import type { ConceptId, UserProfile } from "@/lib/store/types";

const NOW = "2026-05-31T10:00:00.000Z";

function fresh(): UserProfile {
  return createEmptyProfile("u-test", NOW);
}

/** Прогнать N сессий концепции с заданной точностью (хелпер фикстур). */
function withSessions(
  base: UserProfile,
  concept: ConceptId,
  results: boolean[]
): UserProfile {
  return results.reduce(
    (p, correct) => recordSignal(p, { concept, correct }),
    base
  );
}

describe("conceptValue", () => {
  it("взвешивает удержание выше моментальной точности (0.65 vs 0.35)", () => {
    // та же сумма accuracy+retention, но перекос в retention даёт больший балл
    const accHeavy = conceptValue({ accuracy: 1, retentionD1: 0, n: 3 });
    const retHeavy = conceptValue({ accuracy: 0, retentionD1: 1, n: 3 });
    expect(retHeavy).toBeGreaterThan(accHeavy);
    expect(accHeavy).toBeCloseTo(0.35);
    expect(retHeavy).toBeCloseTo(0.65);
  });
});

describe("pickConcept — фаза разведки", () => {
  it("на чистом профиле берёт первую из пула (все n=0, стабильный порядок)", () => {
    const p = fresh();
    expect(pickConcept(p, ALL_CONCEPTS, () => 0.99)).toBe("rule-first");
  });

  it("добирает наименее опробованную концепцию", () => {
    // rule-first показан 2 раза, остальные 0 → должен взять следующую с n=0
    const p = withSessions(fresh(), "rule-first", [true, true]);
    const pick = pickConcept(p, ALL_CONCEPTS, () => 0.99);
    expect(pick).not.toBe("rule-first");
    expect(p.conceptScores[pick].n).toBe(0);
  });

  it("не закрепляет концепцию раньше порога MIN_SESSIONS_TO_LOCK", () => {
    // даже у лидера < порога сессий → preferred остаётся null, ведём разведку
    const p = withSessions(fresh(), "rule-first", [true, true]);
    expect(p.preferredConcept).toBeNull();
    expect(MIN_SESSIONS_TO_LOCK).toBe(3);
  });
});

describe("recordSignal — накопительная accuracy", () => {
  it("копит среднее правильно: [hit, miss, hit] → 2/3", () => {
    const p = withSessions(fresh(), "rule-first", [true, false, true]);
    const s = p.conceptScores["rule-first"];
    expect(s.n).toBe(3);
    expect(s.accuracy).toBeCloseTo(2 / 3);
  });

  it("не трогает retentionD1 (его проставляет отдельная проводка)", () => {
    const p = withSessions(fresh(), "rule-first", [true, true]);
    expect(p.conceptScores["rule-first"].retentionD1).toBe(0);
  });

  it("не мутирует исходный профиль (чистая функция)", () => {
    const p = fresh();
    const before = JSON.stringify(p);
    recordSignal(p, { concept: "rule-first", correct: true });
    expect(JSON.stringify(p)).toBe(before);
  });
});

describe("recordRetention", () => {
  it("копит удержание по уже накопленным сессиям, не трогая accuracy/n", () => {
    // 3 сессии accuracy, потом 1 проводка retention=remembered
    let p = withSessions(fresh(), "rule-first", [true, true, true]);
    const accBefore = p.conceptScores["rule-first"].accuracy;
    p = recordRetention(p, { concept: "rule-first", remembered: true });
    const s = p.conceptScores["rule-first"];
    expect(s.n).toBe(3); // n не вырос
    expect(s.accuracy).toBe(accBefore); // accuracy не тронут
    expect(s.retentionD1).toBeCloseTo(1 / 3); // 1 «запомнил» из 3 циклов
  });

  it("no-op если концепцию ещё ни разу не показывали (n=0)", () => {
    const p = fresh();
    const out = recordRetention(p, { concept: "rule-first", remembered: true });
    expect(out.conceptScores["rule-first"].retentionD1).toBe(0);
  });
});

describe("pickConcept — закрепление и ε-исследование", () => {
  // профиль с одной концепцией, прошедшей порог и ставшей preferred-лидером
  function locked(): UserProfile {
    const p = withSessions(fresh(), "rule-first", [true, true, true]);
    // дотягиваем retention, чтобы rule-first уверенно лидировал
    return recordRetention(p, { concept: "rule-first", remembered: true });
  }

  it("после порога preferred = лидер (rule-first)", () => {
    expect(locked().preferredConcept).toBe("rule-first");
  });

  it("ведёт закреплённой концепцией, когда rnd выше ε", () => {
    const p = locked();
    expect(pickConcept(p, ALL_CONCEPTS, () => EXPLORE_EPSILON + 0.01)).toBe(
      "rule-first"
    );
  });

  it("исследует (least-tried), когда rnd ниже ε", () => {
    const p = locked();
    const pick = pickConcept(p, ALL_CONCEPTS, () => EXPLORE_EPSILON - 0.01);
    // least-tried среди тех, у кого n=0 — не закреплённый rule-first
    expect(pick).not.toBe("rule-first");
    expect(p.conceptScores[pick].n).toBe(0);
  });

  it("уважает пул доступных концепций (нет контента → не предлагает)", () => {
    const p = locked();
    const pool: ConceptId[] = ["examples-first", "context-story"];
    expect(pool).toContain(pickConcept(p, pool, () => 0.99));
  });
});
