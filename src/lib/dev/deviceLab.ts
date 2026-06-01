import { orderedTopics } from "@/lib/course/curriculum";
import { itemsForTopic } from "@/lib/lesson/content";

export const DEVICES = [
  { id: "iphone-se", label: "iPhone SE", width: 375, height: 667 },
  { id: "iphone-15", label: "iPhone 15", width: 393, height: 852 },
  { id: "iphone-plus", label: "iPhone Plus", width: 430, height: 932 },
] as const;

export const SCREENS = [
  { label: "Старт", path: "/" },
  { label: "Курс", path: "/course" },
  { label: "Диагностика", path: "/diagnostics" },
  { label: "Урок: to be", path: "/lesson?topic=to-be" },
  { label: "Разговор", path: "/talk" },
  { label: "Профиль", path: "/profile" },
] as const;

export const SCENARIOS = [
  {
    id: "onboarding-diagnostics",
    label: "Onboarding → diagnostics",
  },
  {
    id: "lesson-error",
    label: "Lesson error feedback",
  },
  {
    id: "core-tabs",
    label: "Core tabs",
  },
  {
    id: "course-smoke",
    label: "Full course smoke",
  },
  {
    id: "course-answer-smoke",
    label: "Full answer smoke",
  },
] as const;

export type DeviceId = (typeof DEVICES)[number]["id"];
export type ScenarioId = (typeof SCENARIOS)[number]["id"];

export function withReloadParam(path: string, reloadKey: number): string {
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}lab=${reloadKey}`;
}

export function courseSmokePaths(): string[] {
  return orderedTopics()
    .filter((topic) => topic.status === "ready")
    .map((topic) => `/lesson?topic=${topic.id}`);
}

export interface CourseAnswerSmokeCase {
  topic: string;
  path: string;
  correctAnswers: string[][];
}

export function courseAnswerSmokeCases(): CourseAnswerSmokeCase[] {
  return orderedTopics()
    .filter((topic) => topic.status === "ready")
    .map((topic) => ({
      topic: topic.id,
      path: `/lesson?topic=${topic.id}`,
      correctAnswers: itemsForTopic(topic.id).map((item) => item.correct),
    }));
}
