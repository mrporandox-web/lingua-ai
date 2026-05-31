import { describe, it, expect } from "vitest";
import { bumpStreak } from "./streak";
import { emptyGamification, type Gamification } from "@/lib/store/types";

// Фиксированные дни (полдень — чтобы было видно, что время игнорируется).
const D1 = "2026-05-29T12:00:00.000Z";
const D2 = "2026-05-30T12:00:00.000Z";
const D3 = "2026-05-31T12:00:00.000Z";
const D5 = "2026-06-02T12:00:00.000Z"; // пропуск дня между D3 и D5

function g(over: Partial<Gamification>): Gamification {
  return { ...emptyGamification(), ...over };
}

describe("bumpStreak — честный daily-streak", () => {
  it("первый день занятий → стрик 1, рекорд 1, дата проставлена", () => {
    const r = bumpStreak(emptyGamification(), D1);
    expect(r.streak).toBe(1);
    expect(r.bestStreak).toBe(1);
    expect(r.lastActiveDate).toBe("2026-05-29");
  });

  it("вчера занимался → стрик +1", () => {
    const prev = g({ streak: 3, bestStreak: 3, lastActiveDate: "2026-05-29" });
    const r = bumpStreak(prev, D2);
    expect(r.streak).toBe(4);
    expect(r.bestStreak).toBe(4);
    expect(r.lastActiveDate).toBe("2026-05-30");
  });

  it("два дня подряд накапливают стрик", () => {
    const a = bumpStreak(emptyGamification(), D1);
    const b = bumpStreak(a, D2);
    const c = bumpStreak(b, D3);
    expect(c.streak).toBe(3);
    expect(c.bestStreak).toBe(3);
  });

  it("тот же день → no-op (идемпотентность за день)", () => {
    const prev = g({ streak: 5, bestStreak: 5, lastActiveDate: "2026-05-31" });
    const r = bumpStreak(prev, D3);
    expect(r.streak).toBe(5); // повторный заход в тот же день не двигает
    expect(r.lastActiveDate).toBe("2026-05-31");
  });

  it("повтор в тот же день несколько раз не растит стрик", () => {
    const a = bumpStreak(emptyGamification(), D1);
    const b = bumpStreak(a, D1);
    const c = bumpStreak(b, D1);
    expect(c.streak).toBe(1);
  });

  it("пропуск дня (≥2 дней разрыв) → стрик сбрасывается на 1", () => {
    const prev = g({ streak: 9, bestStreak: 9, lastActiveDate: "2026-05-31" });
    const r = bumpStreak(prev, D5); // через день — D1 был бы D4, тут D5
    expect(r.streak).toBe(1);
    expect(r.lastActiveDate).toBe("2026-06-02");
  });

  it("сброс стрика сохраняет личный рекорд (bestStreak)", () => {
    const prev = g({ streak: 9, bestStreak: 9, lastActiveDate: "2026-05-31" });
    const r = bumpStreak(prev, D5);
    expect(r.streak).toBe(1);
    expect(r.bestStreak).toBe(9); // рекорд не теряем при срыве стрика
  });

  it("рекорд обновляется, когда текущий стрик его превысил", () => {
    const prev = g({ streak: 4, bestStreak: 4, lastActiveDate: "2026-05-29" });
    const r = bumpStreak(prev, D2);
    expect(r.streak).toBe(5);
    expect(r.bestStreak).toBe(5);
  });

  it("старый профиль без gamification (undefined) → стартует с 1, не падает", () => {
    const r = bumpStreak(undefined, D1);
    expect(r.streak).toBe(1);
    expect(r.bestStreak).toBe(1);
    expect(r.lastActiveDate).toBe("2026-05-29");
  });

  it("частичный/битый объект (нет lastActiveDate) → как первый день", () => {
    const r = bumpStreak({ streak: 3 } as Partial<Gamification>, D1);
    // нет даты последней активности → считаем первым днём, стрик 1
    expect(r.streak).toBe(1);
    expect(r.lastActiveDate).toBe("2026-05-29");
  });
});
