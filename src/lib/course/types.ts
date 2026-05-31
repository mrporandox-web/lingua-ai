// Модель курса: Секция (CEFR) → Юнит → Тема. Линейный путь (как Path Duolingo),
// но прогрессия наша — по мастерству темы (retention), не по «прошёл = галка».
// Контент тем генерит AI поверх кураторского скелета (слой валидации = скелет).

import type { CefrLevel } from "@/lib/store/types";

/** Готовность темы: есть выверенный контент / пока только скелет (в разработке). */
export type CourseStatus = "ready" | "soon";

/** Тема курса — один грамматический концепт. id == LessonItem.topic для ready-тем. */
export interface CourseTopic {
  id: string; // "present-continuous" — ключ темы (= topic в банке уроков)
  title: string; // "Present Continuous"
  blurb: string; // одна строка: о чём тема
  cefr: CefrLevel; // уровень темы
  status: CourseStatus; // ready (есть урок) | soon (скелет)
}

/** Юнит — тематический блок из нескольких тем. */
export interface CourseUnit {
  id: string; // "a1-basics"
  title: string; // "Первые шаги"
  subtitle: string; // короткое пояснение, что внутри
  topicIds: string[]; // темы в порядке прохождения
}

/** Секция = уровень CEFR, содержит юниты. */
export interface CourseSection {
  cefr: CefrLevel; // "A1"
  title: string; // "A1 · Beginner"
  unitIds: string[]; // юниты в порядке
}
