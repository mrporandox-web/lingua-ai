import { describe, expect, it } from "vitest";
import { buildUserPrompt, type GenerateParams } from "./generate";

describe("lesson generation prompt", () => {
  it("includes the learner goal when provided", () => {
    const params: GenerateParams = {
      topic: "present-continuous",
      kind: "present-continuous",
      count: 3,
      concepts: ["contrast-native"],
      cefrLevel: "A1",
      goal: "Работа и карьера",
    };

    expect(buildUserPrompt(params)).toContain(
      "Цель ученика: Работа и карьера"
    );
  });
});
