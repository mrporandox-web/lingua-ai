import { describe, expect, it } from "vitest";
import { emptyGamification } from "@/lib/store/types";
import { awardXp, dailyProgress, dayKey, XP_PER_CORRECT } from "./xp";

describe("awardXp", () => {
  it("начисляет суммарный и дневной XP в тот же день", () => {
    let g = emptyGamification();
    g = awardXp(g, XP_PER_CORRECT, "2026-06-02");
    g = awardXp(g, XP_PER_CORRECT, "2026-06-02");
    expect(g.xp).toBe(20);
    expect(g.dailyXp).toBe(20);
    expect(g.weeklyXp).toBe(20);
  });

  it("сбрасывает дневной XP в новый день, суммарный копится", () => {
    let g = awardXp(emptyGamification(), 30, "2026-06-01");
    g = awardXp(g, 10, "2026-06-02"); // новый день
    expect(g.dailyXp).toBe(10); // сброшен
    expect(g.xp).toBe(40); // суммарный копится
  });

  it("толерантен к профилю без полей xp (старые данные)", () => {
    const legacy = { streak: 3, bestStreak: 5, lastActiveDate: "2026-06-01" };
    const g = awardXp(legacy as never, 10, "2026-06-02");
    expect(g.xp).toBe(10);
    expect(g.streak).toBe(3); // старые поля сохранены
  });
});

describe("dailyProgress", () => {
  it("считает прогресс и достижение цели", () => {
    let g = emptyGamification(); // goal 30
    g = awardXp(g, 10, "2026-06-02");
    const p = dailyProgress(g, "2026-06-02");
    expect(p).toMatchObject({ done: 10, goal: 30, pct: 33, met: false });
  });

  it("цель достигнута → met=true, pct клампится 100", () => {
    const g = awardXp(emptyGamification(), 50, "2026-06-02");
    expect(dailyProgress(g, "2026-06-02")).toMatchObject({ pct: 100, met: true });
  });

  it("в новый день прогресс обнуляется", () => {
    const g = awardXp(emptyGamification(), 30, "2026-06-01");
    expect(dailyProgress(g, "2026-06-02").done).toBe(0);
  });
});

describe("dayKey", () => {
  it("берёт YYYY-MM-DD из ISO", () => {
    expect(dayKey("2026-06-02T15:04:05.000Z")).toBe("2026-06-02");
  });
});
