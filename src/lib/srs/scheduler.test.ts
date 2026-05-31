// Юнит-тесты SRS-планировщика (SM-2 lite). Чистые функции над SrsItem:
// интервалы повторов, сброс на промахе, due-логика, анти-двойной-счёт retention.

import { describe, expect, it } from "vitest";
import {
  START_EASE,
  dayKey,
  daysBetween,
  dueItems,
  findSrs,
  gradeItem,
  isDue,
  newSrsItem,
  upsertSrs,
} from "./scheduler";
import type { SrsItem } from "@/lib/store/types";

const DAY0 = "2026-05-31T10:00:00.000Z";
const DAY1 = "2026-06-01T10:00:00.000Z";
const DAY4 = "2026-06-04T10:00:00.000Z";

describe("daysBetween / dayKey", () => {
  it("считает полные календарные дни", () => {
    expect(daysBetween(DAY0, DAY1)).toBe(1);
    expect(daysBetween(DAY0, DAY4)).toBe(4);
    expect(daysBetween(DAY0, DAY0)).toBe(0);
  });

  it("dayKey срезает время до YYYY-MM-DD", () => {
    expect(dayKey(DAY0)).toBe("2026-05-31");
  });
});

describe("gradeItem — успешные повторы", () => {
  it("первый успех: interval=1 день, reps=1, due назавтра", () => {
    const s = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    expect(s.reps).toBe(1);
    expect(s.interval).toBe(1);
    expect(s.ease).toBe(START_EASE);
    expect(dayKey(s.dueDate)).toBe("2026-06-01");
  });

  it("второй успех: interval=3 дня (фиксированный, как Anki)", () => {
    const s1 = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    const s2 = gradeItem(s1, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY1,
    });
    expect(s2.reps).toBe(2);
    expect(s2.interval).toBe(3);
  });

  it("третий+ успех: interval = round(prev * ease)", () => {
    let s = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    s = gradeItem(s, { item: "t1", concept: "rule-first", correct: true, now: DAY1 });
    const s3 = gradeItem(s, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY4,
    });
    // interval=3, ease=2.5 → round(7.5)=8
    expect(s3.interval).toBe(Math.round(3 * START_EASE));
  });
});

describe("gradeItem — промах", () => {
  it("сбрасывает серию: interval=0, reps=0, due=сейчас, ease вниз", () => {
    const ok = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    const miss = gradeItem(ok, {
      item: "t1",
      concept: "rule-first",
      correct: false,
      now: DAY1,
    });
    expect(miss.reps).toBe(0);
    expect(miss.interval).toBe(0);
    expect(miss.dueDate).toBe(DAY1); // снова в работу сразу
    expect(miss.ease).toBeLessThan(START_EASE);
  });

  it("ease не падает ниже MIN_EASE (1.3) на серии промахов", () => {
    let s: SrsItem | undefined;
    for (let i = 0; i < 20; i++) {
      s = gradeItem(s, {
        item: "t1",
        concept: "rule-first",
        correct: false,
        now: DAY0,
      });
    }
    expect(s!.ease).toBeGreaterThanOrEqual(1.3);
  });
});

describe("retentionScored — анти-двойной-счёт", () => {
  it("gradeItem сбрасывает флаг в false на каждом повторе", () => {
    const s = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    // имитируем зачёт retention (как делает сервис), затем новый повтор
    const scored = { ...s, retentionScored: true };
    const next = gradeItem(scored, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY1,
    });
    expect(next.retentionScored).toBe(false); // новый цикл — снова можно зачесть
  });

  it("обновляет lastConcept на концепцию текущего показа", () => {
    const s = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    const next = gradeItem(s, {
      item: "t1",
      concept: "examples-first",
      correct: true,
      now: DAY1,
    });
    expect(next.lastConcept).toBe("examples-first");
  });
});

describe("isDue / dueItems", () => {
  it("новая запись доступна сразу (due=now)", () => {
    const s = newSrsItem("t1", "rule-first", DAY0);
    expect(isDue(s, DAY0)).toBe(true);
  });

  it("после успеха не due до dueDate, due после", () => {
    const s = gradeItem(undefined, {
      item: "t1",
      concept: "rule-first",
      correct: true,
      now: DAY0,
    });
    expect(isDue(s, DAY0)).toBe(false); // due завтра
    expect(isDue(s, DAY1)).toBe(true);
  });

  it("dueItems возвращает только созревшие, раньше due — выше", () => {
    const a = { ...newSrsItem("a", "rule-first", DAY0), dueDate: DAY1 };
    const b = { ...newSrsItem("b", "rule-first", DAY0), dueDate: DAY0 };
    const c = { ...newSrsItem("c", "rule-first", DAY0), dueDate: DAY4 };
    const due = dueItems([a, b, c], DAY1);
    expect(due.map((s) => s.item)).toEqual(["b", "a"]); // c ещё не созрел
  });
});

describe("findSrs / upsertSrs", () => {
  it("upsert добавляет новую и заменяет существующую по item-id", () => {
    const a = newSrsItem("a", "rule-first", DAY0);
    let q = upsertSrs([], a);
    expect(q).toHaveLength(1);
    const aNew = { ...a, reps: 5 };
    q = upsertSrs(q, aNew);
    expect(q).toHaveLength(1); // заменили, не задвоили
    expect(findSrs(q, "a")!.reps).toBe(5);
  });

  it("findSrs возвращает undefined для неизвестного id", () => {
    expect(findSrs([], "nope")).toBeUndefined();
  });
});
