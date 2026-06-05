// Контент B2 · Юнит 3 «Будущее и вероятность» (кураторский, см. content.ts).
// Темы: future-perfect, future-continuous, modals-past-deduction, likely-bound.

import type { LessonItem } from "./items";

// ── Future Perfect: will have + V3 (к моменту в будущем) ─────────────────────
export const FUTURE_PERFECT: LessonItem[] = [
  {
    topic: "future-perfect",
    kind: "future-perfect",
    ru: "К завтрашнему дню я закончу работу.",
    correct: ["By", "tomorrow", "I", "will", "have", "finished"],
    bank: ["By", "tomorrow", "I", "will", "have", "finished", "finish", "finishes"],
    subject: "I",
    whyOk: "Верно! Действие завершится К моменту → <b>will have + 3-я форма</b>: <b>will have finished</b>.",
    bridge:
      "Future Perfect = действие будет ЗАКОНЧЕНО к точке в будущем. Схема: <b>will have + V3</b>. «К завтра закончу» = <b>will have finished</b>. Маркер <i>by</i> (к) почти всегда рядом.",
    rule: "<b>will have + V3</b> — завершится к моменту в будущем (by tomorrow, by then).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will + have + finished.",
        bridge:
          "Схема: <b>will have + V3</b>. finish → finished. <b>I will have finished by tomorrow</b>.",
        rule: "will have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will have finished</i>, <i>will have done</i>, <i>will have left</i> — will have + V3.",
        bridge:
          "Сравни: <i>I <b>will finish</b> tomorrow</i> (просто будущее) ↔ <i>I <b>will have finished</b> by tomorrow</i> (уже к завтра готово).",
        rule: "«К моменту X сделаю» → will have + V3.",
      },
    },
  },
  {
    topic: "future-perfect",
    kind: "future-perfect",
    ru: "К следующему году они построят мост.",
    correct: ["By", "next", "year", "they", "will", "have", "built"],
    bank: ["By", "next", "year", "they", "will", "have", "built", "build", "builds"],
    subject: "they",
    whyOk: "Верно! «Построят к моменту» → <b>will have built</b> (build → built).",
    bridge:
      "К будущей точке всё уже сделано → <b>will have + V3</b>. build неправильный: build–built–built. <b>They will have built it by next year</b>.",
    rule: "<b>will have + V3</b>; build → built.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will + have + built.",
        bridge:
          "will + have + built (V3). <b>They will have built the bridge by next year</b>.",
        rule: "will have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will have built</i>, <i>will have written</i>, <i>will have made</i>.",
        bridge:
          "Сравни: <i>they <b>will build</b> it</i> (когда-то) ↔ <i>they <b>will have built</b> it by next year</i> (к сроку готово).",
        rule: "«К сроку построят» → will have built.",
      },
    },
  },
  {
    topic: "future-perfect",
    kind: "future-perfect",
    ru: "К шести часам она уйдёт.",
    correct: ["By", "six", "she", "will", "have", "left"],
    bank: ["By", "six", "she", "will", "have", "left", "leave", "leaves"],
    subject: "she",
    whyOk: "Верно! «К шести уйдёт» → <b>will have left</b> (leave → left).",
    bridge:
      "К будущему моменту действие завершено → <b>will have + V3</b>. leave → left. <b>She will have left by six</b>.",
    rule: "<b>will have + V3</b>; leave → left.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will + have + left.",
        bridge:
          "will + have + left (V3). <b>She will have left by six</b>.",
        rule: "will have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will have left</i>, <i>will have gone</i>, <i>will have arrived</i>.",
        bridge:
          "Сравни: <i>she <b>will leave</b> later</i> ↔ <i>she <b>will have left</b> by six</i> (к шести её уже нет).",
        rule: "«К моменту уйдёт» → will have left.",
      },
    },
  },
];

// ── Future Continuous: will be + V-ing (в процессе в момент будущего) ────────
export const FUTURE_CONTINUOUS: LessonItem[] = [
  {
    topic: "future-continuous",
    kind: "future-continuous",
    ru: "Завтра в восемь я буду работать.",
    correct: ["At", "eight", "tomorrow", "I", "will", "be", "working"],
    bank: ["At", "eight", "tomorrow", "I", "will", "be", "working", "work", "works"],
    subject: "I",
    whyOk: "Верно! Действие В ПРОЦЕССЕ в момент будущего → <b>will be + V-ing</b>: <b>will be working</b>.",
    bridge:
      "Future Continuous = в конкретный момент будущего действие будет ИДТИ. Схема: <b>will be + V-ing</b>. «В восемь буду работать» = <b>will be working</b>.",
    rule: "<b>will be + V-ing</b> — процесс в момент будущего (at eight, this time tomorrow).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will + be + working.",
        bridge:
          "Схема: <b>will be + V-ing</b>. work → working. <b>I will be working at eight</b>.",
        rule: "will be + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will be working</i>, <i>will be sleeping</i>, <i>will be flying</i> — will be + V-ing.",
        bridge:
          "Сравни: <i>I <b>will work</b> tomorrow</i> (факт) ↔ <i>at eight I <b>will be working</b></i> (в этот момент в процессе).",
        rule: "«В момент X буду делать» → will be + V-ing.",
      },
    },
  },
  {
    topic: "future-continuous",
    kind: "future-continuous",
    ru: "Вечером они будут смотреть фильм.",
    correct: ["Tonight", "they", "will", "be", "watching", "a", "film"],
    bank: ["Tonight", "they", "will", "be", "watching", "a", "film", "watch", "watches"],
    subject: "they",
    whyOk: "Верно! «Будут смотреть» (в процессе) → <b>will be watching</b>.",
    bridge:
      "Вечером действие будет ИДТИ → <b>will be + V-ing</b>: <b>will be watching</b>. <b>Tonight they will be watching a film</b>.",
    rule: "<b>will be + V-ing</b> — длящееся действие в будущем.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will + be + watching.",
        bridge:
          "will + be + watching (-ing). <b>Tonight they will be watching a film</b>.",
        rule: "will be + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will be watching</i>, <i>will be eating</i>, <i>will be driving</i>.",
        bridge:
          "Сравни: <i>they <b>will watch</b> a film</i> (посмотрят) ↔ <i>they <b>will be watching</b></i> (будут в процессе).",
        rule: "«Будут делать» → will be + V-ing.",
      },
    },
  },
  {
    topic: "future-continuous",
    kind: "future-continuous",
    ru: "В это время завтра она будет лететь.",
    correct: ["This", "time", "tomorrow", "she", "will", "be", "flying"],
    bank: ["This", "time", "tomorrow", "she", "will", "be", "flying", "fly", "flies"],
    subject: "she",
    whyOk: "Верно! «Будет лететь» (в процессе) → <b>will be flying</b> (fly → flying).",
    bridge:
      "В конкретный момент завтра действие идёт → <b>will be + V-ing</b>. fly → flying. <b>This time tomorrow she will be flying</b>.",
    rule: "<b>will be + V-ing</b>; fly → flying.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will + be + flying.",
        bridge:
          "will + be + flying (-ing). <b>This time tomorrow she will be flying</b>.",
        rule: "will be + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will be flying</i>, <i>will be travelling</i>, <i>will be waiting</i>.",
        bridge:
          "Сравни: <i>she <b>will fly</b> tomorrow</i> (полетит) ↔ <i>this time tomorrow she <b>will be flying</b></i> (в этот момент в воздухе).",
        rule: "«В момент X будет делать» → will be + V-ing.",
      },
    },
  },
];

// ── Догадки о прошлом: must/can't/might have + V3 ────────────────────────────
export const MODALS_PAST_DEDUCTION: LessonItem[] = [
  {
    topic: "modals-past-deduction",
    kind: "modals-past-deduction",
    ru: "Он, должно быть, забыл.",
    correct: ["He", "must", "have", "forgotten"],
    bank: ["He", "must", "have", "forgotten", "forgot", "forget"],
    subject: "He",
    whyOk: "Верно! Уверенная догадка о прошлом → <b>must have + 3-я форма</b>: <b>must have forgotten</b>.",
    bridge:
      "Догадка «наверняка так было» → <b>must have + V3</b>. forget → forgotten. «Должно быть, забыл» = <b>must have forgotten</b>.",
    rule: "<b>must have + V3</b> — «наверняка сделал» (уверенная догадка о прошлом).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: must + have + forgotten.",
        bridge:
          "Схема: <b>must have + V3</b>. forget → forgotten. <b>He must have forgotten</b>.",
        rule: "must have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>must have forgotten</i>, <i>must have left</i>, <i>must have known</i>.",
        bridge:
          "Сравни: <i>he <b>must be</b> tired</i> (сейчас) ↔ <i>he <b>must have</b> forgotten</i> (тогда, в прошлом).",
        rule: "«Наверняка сделал» → must have + V3.",
      },
    },
  },
  {
    topic: "modals-past-deduction",
    kind: "modals-past-deduction",
    ru: "Она не могла этого сказать.",
    correct: ["She", "can't", "have", "said", "it"],
    bank: ["She", "can't", "have", "said", "it", "say", "says"],
    subject: "She",
    whyOk: "Верно! «Не могла сделать» → <b>can't have + 3-я форма</b>: <b>can't have said</b>.",
    bridge:
      "Уверенность, что чего-то НЕ было → <b>can't have + V3</b>. say → said. «Не могла сказать» = <b>can't have said it</b>.",
    rule: "<b>can't have + V3</b> — «не может быть, что сделал».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: can't + have + said.",
        bridge:
          "Схема: <b>can't have + V3</b>. say → said. <b>She can't have said it</b>.",
        rule: "can't have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>can't have said</i>, <i>can't have known</i>, <i>can't have gone</i>.",
        bridge:
          "Сравни: <i>she <b>must have</b> said it</i> (наверняка да) ↔ <i>she <b>can't have</b> said it</i> (точно нет).",
        rule: "«Не может быть, что сделал» → can't have + V3.",
      },
    },
  },
  {
    topic: "modals-past-deduction",
    kind: "modals-past-deduction",
    ru: "Они, возможно, опоздали.",
    correct: ["They", "might", "have", "been", "late"],
    bank: ["They", "might", "have", "been", "late", "are", "were"],
    subject: "They",
    whyOk: "Верно! Неуверенная догадка → <b>might have + 3-я форма</b>: <b>might have been</b>.",
    bridge:
      "«Может быть, так было» → <b>might have + V3</b>. be → been. «Возможно, опоздали» = <b>might have been late</b>.",
    rule: "<b>might have + V3</b> — «возможно, сделал» (неуверенная догадка).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: might + have + been.",
        bridge:
          "Схема: <b>might have + V3</b>. be → been. <b>They might have been late</b>.",
        rule: "might have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>might have been</i>, <i>might have missed</i>, <i>might have forgotten</i>.",
        bridge:
          "Сравни: <i>they <b>must have</b> been late</i> (наверняка) ↔ <i>they <b>might have</b> been late</i> (может быть).",
        rule: "«Возможно, сделал» → might have + V3.",
      },
    },
  },
];

// ── Вероятность: be likely to / be bound to + V ──────────────────────────────
export const LIKELY_BOUND: LessonItem[] = [
  {
    topic: "likely-bound",
    kind: "likely-bound",
    ru: "Он, скорее всего, опоздает.",
    correct: ["He", "is", "likely", "to", "be", "late"],
    bank: ["He", "is", "likely", "to", "be", "late", "bound", "will"],
    subject: "He",
    whyOk: "Верно! «Скорее всего» → <b>is likely to + инфинитив</b>: <b>is likely to be late</b>.",
    bridge:
      "Высокая вероятность = <b>be likely to + V</b>. «Скорее всего опоздает» = <b>is likely to be late</b>. После likely — всегда <i>to</i> + глагол.",
    rule: "<b>be likely to + V</b> — «скорее всего, вероятно».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: is + likely + to be + late.",
        bridge:
          "Схема: <b>be likely to + V</b>. <b>He is likely to be late</b>.",
        rule: "be likely to + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is likely to be late</i>, <i>is likely to win</i>, <i>is likely to rain</i>.",
        bridge:
          "Сравни: <i>he <b>will probably</b> be late</i> ↔ <i>he <b>is likely to</b> be late</i> (то же, формальнее).",
        rule: "«Скорее всего сделает» → is likely to + V.",
      },
    },
  },
  {
    topic: "likely-bound",
    kind: "likely-bound",
    ru: "Это обязательно сработает.",
    correct: ["It", "is", "bound", "to", "work"],
    bank: ["It", "is", "bound", "to", "work", "likely", "be"],
    subject: "It",
    whyOk: "Верно! «Обязательно/наверняка» → <b>is bound to + инфинитив</b>: <b>is bound to work</b>.",
    bridge:
      "Почти 100% уверенность = <b>be bound to + V</b> (сильнее, чем likely). «Обязательно сработает» = <b>It is bound to work</b>.",
    rule: "<b>be bound to + V</b> — «наверняка, обязательно» (сильнее likely).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: is + bound + to + work.",
        bridge:
          "Схема: <b>be bound to + V</b>. <b>It is bound to work</b>.",
        rule: "be bound to + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is bound to work</i>, <i>is bound to happen</i>, <i>is bound to fail</i>.",
        bridge:
          "Сравни: <i>it <b>is likely to</b> work</i> (вероятно) ↔ <i>it <b>is bound to</b> work</i> (наверняка, без сомнений).",
        rule: "«Обязательно сделает» → is bound to + V.",
      },
    },
  },
  {
    topic: "likely-bound",
    kind: "likely-bound",
    ru: "Они, вероятно, выиграют.",
    correct: ["They", "are", "likely", "to", "win"],
    bank: ["They", "are", "likely", "to", "win", "is", "bound"],
    subject: "They",
    whyOk: "Верно! «Вероятно» → <b>are likely to + инфинитив</b>: <b>are likely to win</b>.",
    bridge:
      "They → <b>are</b> likely. Схема: <b>be likely to + V</b>. «Вероятно выиграют» = <b>They are likely to win</b>.",
    rule: "<b>be likely to + V</b>; They → are likely.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: are + likely + to + win.",
        bridge:
          "They → are. <b>are likely to + V</b>. <b>They are likely to win</b>.",
        rule: "are likely to + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>are likely to win</i>, <i>are likely to come</i>, <i>are likely to agree</i>.",
        bridge:
          "Сравни: <i>he <b>is likely to</b> win</i> ↔ <i>they <b>are likely to</b> win</i> (be по лицу: is/are).",
        rule: "«Вероятно сделают» → are likely to + V.",
      },
    },
  },
];
