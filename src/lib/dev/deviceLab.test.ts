import { describe, expect, it } from "vitest";
import {
  DEVICES,
  SCENARIOS,
  SCREENS,
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
    expect(paths).toHaveLength(48);
    expect(paths[0]).toBe("/lesson?topic=to-be");
    expect(paths.at(-1)).toBe("/lesson?topic=so-such");
  });
});
