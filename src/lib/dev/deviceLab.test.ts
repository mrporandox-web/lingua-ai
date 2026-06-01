import { describe, expect, it } from "vitest";
import {
  DEVICES,
  SCENARIOS,
  SCREENS,
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
    ]);
  });

  it("adds reload markers without breaking existing query strings", () => {
    expect(withReloadParam("/", 42)).toBe("/?lab=42");
    expect(withReloadParam("/lesson?topic=to-be", 42)).toBe(
      "/lesson?topic=to-be&lab=42"
    );
  });
});
