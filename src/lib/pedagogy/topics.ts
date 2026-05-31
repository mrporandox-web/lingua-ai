// Человеко-читаемые ярлыки грамматических тем — общие для диагностики и профиля.
// Ключи совпадают с topic в WeakTopic (src/lib/store/types.ts) и банком вопросов.

/** Русский ярлык темы для показа ученику. */
export const TOPIC_LABEL: Record<string, string> = {
  "to-be": "глагол to be",
  articles: "артикли",
  "past-simple": "Past Simple",
  comparatives: "сравнительная степень",
  "present-perfect": "Present Perfect",
  "first-conditional": "1-й тип условия",
  "passive-voice": "пассивный залог",
  "reported-speech": "косвенная речь",
  inversion: "инверсия",
  "mixed-conditionals": "смешанные условия",
  "present-continuous": "Present Continuous",
};

/** Безопасный доступ к ярлыку темы (с дефолтом на сам id). */
export function topicLabel(topic: string): string {
  return TOPIC_LABEL[topic] ?? topic;
}
