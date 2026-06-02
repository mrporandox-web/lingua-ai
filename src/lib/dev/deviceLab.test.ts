import { describe, expect, it } from "vitest";
import {
  DEVICES,
  SCENARIOS,
  SCREENS,
  courseAnswerSmokeCases,
  courseSmokePaths,
  withReloadParam,
} from "./deviceLab";

describe("Device Lab config", () => {
  it("keeps the expected device, screen, and scenario presets", () => {
    expect(DEVICES.map((device) => device.id)).toEqual([
      "iphone-se",
      "iphone-15",
      "iphone-plus",
    ]);
    expect(SCREENS.map((screen) => screen.path)).toEqual([
      "/",
      "/course",
      "/diagnostics",
      "/lesson?topic=to-be",
      "/talk",
      "/profile",
    ]);
    expect(SCENARIOS.map((scenario) => scenario.id)).toEqual([
      "onboarding-diagnostics",
      "lesson-error",
      "core-tabs",
      "course-smoke",
      "course-answer-smoke",
    ]);
  });

  it("adds reload markers without breaking existing query strings", () => {
    expect(withReloadParam("/", 42)).toBe("/?lab=42");
    expect(withReloadParam("/lesson?topic=to-be", 42)).toBe(
      "/lesson?topic=to-be&lab=42"
    );
  });

  it("builds a smoke path for every ready course topic", () => {
    const paths = courseSmokePaths();
    expect(paths).toHaveLength(52);
    expect(paths[0]).toBe("/lesson?topic=to-be");
    expect(paths.at(-1)).toBe("/lesson?topic=wish-past-perfect");
  });

  it("builds answer smoke cases with every item for each ready course topic", () => {
    const cases = courseAnswerSmokeCases();
    expect(cases).toHaveLength(52);
    expect(cases[0]).toEqual({
      topic: "to-be",
      path: "/lesson?topic=to-be",
      correctAnswers: [
        ["I", "am", "a", "student"],
        ["She", "is", "happy"],
        ["They", "are", "at", "home"],
      ],
    });
    expect(cases.at(-1)).toEqual({
      topic: "wish-past-perfect",
      path: "/lesson?topic=wish-past-perfect",
      correctAnswers: [
        ["I", "wish", "I", "had", "studied", "harder"],
        ["I", "wish", "I", "had", "told", "you"],
        ["I", "wish", "we", "had", "gone"],
      ],
    });
    expect(
      cases.reduce((total, item) => total + item.correctAnswers.length, 0)
    ).toBe(156);
  });
});
