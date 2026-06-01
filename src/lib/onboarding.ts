export const LEARNING_GOALS = [
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
] as const;

export type LearningGoalId = (typeof LEARNING_GOALS)[number]["id"];

export const DEFAULT_LEARNING_GOAL: LearningGoalId = "travel";

export function isLearningGoalId(value: unknown): value is LearningGoalId {
  return (
    typeof value === "string" &&
    LEARNING_GOALS.some((goal) => goal.id === value)
  );
}

export function learningGoalLabel(goal: string | null | undefined): string {
  if (!goal) return "";
  return LEARNING_GOALS.find((item) => item.id === goal)?.title ?? goal;
}
