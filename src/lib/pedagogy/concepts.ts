// Человеко-читаемые ярлыки концепций подачи — для UI (концепт-чип и т.п.).
// Сами id живут в src/lib/store/types.ts (ConceptId).

import type { ConceptId } from "@/lib/store/types";

/** Короткий ярлык концепции для показа ученику (русский). */
export const CONCEPT_LABEL: Record<ConceptId, string> = {
  "rule-first": "Правило → примеры",
  "examples-first": "Примеры → правило",
  "context-story": "В диалоге/истории",
  "contrast-native": "Сравнение с русским",
};

/** Одна строка-подпись «почему так подаём» — необязательная, для подсказок. */
export const CONCEPT_HINT: Record<ConceptId, string> = {
  "rule-first": "сначала формула, потом тренировка",
  "examples-first": "ловишь закономерность на примерах",
  "context-story": "грамматика внутри ситуации",
  "contrast-native": "как в русском vs как в английском",
};
