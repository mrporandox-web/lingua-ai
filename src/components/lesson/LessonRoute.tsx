"use client";

// Читает ?topic= на клиенте (useSearchParams) и передаёт в LessonScreen.
// Клиентское чтение нужно для static-export (нет сервера, но query доступен
// в рантайме). Оборачивается в <Suspense> на странице.
import { useSearchParams } from "next/navigation";
import { LessonScreen } from "@/components/lesson/LessonScreen";

export function LessonRoute() {
  const topic = useSearchParams().get("topic");
  return <LessonScreen topic={topic} />;
}
