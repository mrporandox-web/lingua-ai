import { describe, expect, it } from "vitest";
import {
  DEFAULT_LEARNING_GOAL,
  LEARNING_GOALS,
  isLearningGoalId,
  learningGoalLabel,
} from "./onboarding";

describe("Lyra onboarding goals", () => {
  it("matches the goal choices from the Lyra handoff", () => {
    expect(LEARNING_GOALS).toEqual([
      {
        id: "travel",
        title: "Путешествия",
        subtitle: "свободно говорить в поездке",
      },
      {
        id: "series",
        title: "Сериалы без субтитров",
        subtitle: "понимать на слух",
      },
      {
        id: "career",
        title: "Работа и карьера",
        subtitle: "вести встречи",
      },
      {
        id: "relocation",
        title: "Переезд",
        subtitle: "жить в стране языка",
      },
      {
        id: "self",
        title: "Для себя",
        subtitle: "держать ум в тонусе",
      },
    ]);
    expect(DEFAULT_LEARNING_GOAL).toBe("travel");
  });

  it("validates and labels stored goal ids", () => {
    expect(isLearningGoalId("career")).toBe(true);
    expect(isLearningGoalId("unknown")).toBe(false);
    expect(learningGoalLabel("career")).toBe("Работа и карьера");
    expect(learningGoalLabel("custom goal")).toBe("custom goal");
  });
});
