// Контент Юнита 4 курса A1 «Каждый день» (кураторский, см. content.ts).
// Темы: adverbs-frequency, like-ing, numbers-time, wh-questions.
// Формат sentence-builder; каждый айтем проходит validateLessonItem.

import type { LessonItem } from "./items";

// ── adverbs of frequency: наречия частоты ───────────────────────────────────
export const ADVERBS_FREQUENCY: LessonItem[] = [
  {
    topic: "adverbs-frequency",
    kind: "adverbs-frequency",
    ru: "Я всегда завтракаю.",
    correct: ["I", "always", "have", "breakfast"],
    bank: ["I", "always", "have", "breakfast", "am", "never"],
    subject: "I",
    whyOk: "Верно! Наречие частоты стоит <b>перед</b> смысловым глаголом: <b>always have</b>.",
    bridge:
      "Наречия частоты (always, usually, never) ставятся <b>перед</b> основным глаголом: <i>I <b>always</b> have…</i>, не «I have always». Поэтому <b>I always have breakfast</b>.",
    rule: "Частота (always/usually/often/never) → <b>перед</b> смысловым глаголом.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>always</b> перед глаголом have.",
        bridge:
          "Позиция: <b>подлежащее + наречие + глагол</b>. I + always + have. <b>I always have breakfast</b>.",
        rule: "Наречие частоты → между подлежащим и глаголом.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I always have</i>, <i>I never eat</i>, <i>I usually go</i> — наречие перед глаголом.",
        bridge:
          "Ряд: <i>I <b>always</b> work</i> · <i>I <b>never</b> sleep</i>. Слово частоты идёт прямо перед действием.",
        rule: "Перед глаголом: <b>always/usually/never</b> + V.",
      },
    },
  },
  {
    topic: "adverbs-frequency",
    kind: "adverbs-frequency",
    ru: "Она никогда не опаздывает.",
    correct: ["She", "is", "never", "late"],
    bank: ["She", "is", "never", "late", "not", "never"],
    subject: "She",
    whyOk: "Верно! С глаголом <b>be</b> наречие частоты стоит <b>после</b> be: <b>is never</b>.",
    bridge:
      "Особый случай: если в предложении глагол <b>be</b> (am/is/are), наречие частоты ставится <b>после</b> него: <i>She <b>is never</b> late</i>. И «никогда не» = одно слово <b>never</b> (второго «not» не нужно).",
    rule: "С <b>be</b>: наречие <b>после</b> be (is never). never = «никогда не».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>is</b> + never (после be).",
        bridge:
          "Правило позиции с be: <b>be + наречие</b>. is + never. <b>She is never late</b>. Без второго отрицания — never уже отрицает.",
        rule: "be → наречие после be; never самодостаточно.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is never</i>, <i>are always</i>, <i>am usually</i> — после be.",
        bridge:
          "Сравни: <i>I <b>never</b> eat</i> (перед обычным глаголом) ↔ <i>she <b>is never</b> late</i> (после be).",
        rule: "После be → наречие частоты.",
      },
    },
  },
  {
    topic: "adverbs-frequency",
    kind: "adverbs-frequency",
    ru: "Мы обычно гуляем.",
    correct: ["We", "usually", "walk"],
    bank: ["We", "usually", "walk", "are", "always"],
    subject: "We",
    whyOk: "Верно! <b>usually</b> (обычно) перед глаголом: <b>We usually walk</b>.",
    bridge:
      "«Обычно» = <b>usually</b>, и оно, как все наречия частоты, идёт <b>перед</b> смысловым глаголом: <b>We usually walk</b>.",
    rule: "<b>usually</b> = обычно. Перед глаголом, как always/often.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>usually</b> перед walk.",
        bridge:
          "Подлежащее + <b>usually</b> + глагол. We + usually + walk. <b>We usually walk</b>.",
        rule: "usually → перед глаголом.",
      },
      "examples-first": {
        whyOk: "Верно! <i>usually walk</i>, <i>usually read</i> — обычно + действие.",
        bridge:
          "Ряд: <i>we <b>usually</b> walk</i> · <i>they <b>often</b> meet</i>. Частота перед глаголом.",
        rule: "«Обычно/часто» → перед глаголом.",
      },
    },
  },
];

// ── like + -ing: что нравится делать ────────────────────────────────────────
export const LIKE_ING: LessonItem[] = [
  {
    topic: "like-ing",
    kind: "like-ing",
    ru: "Я люблю читать.",
    correct: ["I", "like", "reading"],
    bank: ["I", "like", "reading", "read", "likes"],
    subject: "I",
    whyOk: "Верно! После <b>like</b> действие берёт <b>-ing</b>: <b>like reading</b>.",
    bridge:
      "В русском «люблю читать» — два глагола подряд. В английском после <b>like</b> второй глагол обычно с <b>-ing</b>: <b>like reading</b>, не «like read».",
    rule: "<b>like / love / enjoy + V-ing</b>. like reading, love cooking.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: like + <b>reading</b> (-ing).",
        bridge:
          "После like действие оформляется как <b>-ing</b>: read → <b>reading</b>. <b>I like reading</b>.",
        rule: "like + <b>V-ing</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>like reading</i>, <i>like swimming</i>, <i>like playing</i> — везде -ing.",
        bridge:
          "Ряд: <i>I like <b>reading</b></i> · <i>I like <b>cooking</b></i>. После like — хвост <b>-ing</b>.",
        rule: "После like → глагол с <b>-ing</b>.",
      },
    },
  },
  {
    topic: "like-ing",
    kind: "like-ing",
    ru: "Она любит готовить.",
    correct: ["She", "likes", "cooking"],
    bank: ["She", "likes", "cooking", "cook", "like"],
    subject: "She",
    whyOk: "Верно! <b>She likes</b> (-s у like) + <b>cooking</b> (-ing у второго глагола).",
    bridge:
      "Здесь два правила сразу: для she глагол like берёт <b>-s</b> (likes), а второй глагол после него — с <b>-ing</b> (cooking). <b>She likes cooking</b>.",
    rule: "he/she/it: <b>likes</b> + <b>V-ing</b>. she likes cooking.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>likes</b> (третье лицо) + <b>cooking</b> (-ing).",
        bridge:
          "Шаг 1: she → like + s = <b>likes</b>. Шаг 2: второй глагол → <b>cooking</b>. <b>She likes cooking</b>.",
        rule: "she likes + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>she likes cooking</i>, <i>he likes reading</i> — likes + -ing.",
        bridge:
          "Сравни: <i>I <b>like</b> cooking</i> ↔ <i>she <b>likes</b> cooking</i>. Третье лицо добавляет -s к like, -ing остаётся.",
        rule: "Третье лицо: likes + V-ing.",
      },
    },
  },
  {
    topic: "like-ing",
    kind: "like-ing",
    ru: "Они любят путешествовать.",
    correct: ["They", "like", "traveling"],
    bank: ["They", "like", "traveling", "travel", "likes"],
    subject: "They",
    whyOk: "Верно! <b>They like</b> (без -s) + <b>traveling</b> (-ing).",
    bridge:
      "Для they глагол like без -s, а второй глагол — с <b>-ing</b>: <b>like traveling</b>. <b>They like traveling</b>.",
    rule: "they/we/I: <b>like + V-ing</b> (без -s у like).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: they → <b>like</b> + <b>traveling</b>.",
        bridge:
          "they (множеств.) → like без -s. Второй глагол → <b>traveling</b>. <b>They like traveling</b>.",
        rule: "they like + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>they like traveling</i>, <i>we like dancing</i> — like + -ing.",
        bridge:
          "Ряд: <i>they like <b>traveling</b></i> · <i>we like <b>singing</b></i>. После like — <b>-ing</b>.",
        rule: "they/we → like + V-ing.",
      },
    },
  },
];

// ── numbers & time: числа и время ───────────────────────────────────────────
export const NUMBERS_TIME: LessonItem[] = [
  {
    topic: "numbers-time",
    kind: "numbers-time",
    ru: "Сейчас три часа.",
    correct: ["It", "is", "three", "o'clock"],
    bank: ["It", "is", "three", "o'clock", "at", "are"],
    subject: "It",
    whyOk: "Верно! О времени говорят через <b>It is</b>: <b>It is three o'clock</b>.",
    bridge:
      "В русском «сейчас три часа» — без подлежащего. В английском время вводят безличным <b>It is</b>: <i>It is three o'clock</i>. «Ровно столько-то часов» = <b>o'clock</b>.",
    rule: "Время: <b>It is</b> + число (+ o'clock для ровного часа).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>It is</b> + three o'clock.",
        bridge:
          "Время требует безличного подлежащего <b>It</b> + is. Дальше число и o'clock. <b>It is three o'clock</b>.",
        rule: "<b>It is</b> + время.",
      },
      "examples-first": {
        whyOk: "Верно! <i>It is three o'clock</i>, <i>It is five o'clock</i> — время через It is.",
        bridge:
          "Ряд: <i><b>It is</b> two o'clock</i> · <i><b>It is</b> ten o'clock</i>. Время → <b>It is</b>.",
        rule: "«Сейчас столько-то» → It is …",
      },
    },
  },
  {
    topic: "numbers-time",
    kind: "numbers-time",
    ru: "У меня два брата.",
    correct: ["I", "have", "two", "brothers"],
    bank: ["I", "have", "two", "brothers", "brother", "has"],
    subject: "I",
    whyOk: "Верно! После числа >1 — множественное: <b>two brothers</b>.",
    bridge:
      "После числа больше одного существительное во множественном числе: brother → <b>brothers</b>. «У меня есть» здесь через <b>have</b>.",
    rule: "Число >1 → существительное во мн.числе: two brothers, five cars.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: two → <b>brothers</b> (мн.ч.).",
        bridge:
          "Число 2 → существительное мн.ч. → <b>brothers</b>. <b>I have two brothers</b>.",
        rule: "Больше 1 → сущ. + -s.",
      },
      "examples-first": {
        whyOk: "Верно! <i>two brothers</i>, <i>three cats</i>, <i>five days</i> — после числа мн.ч.",
        bridge:
          "Сравни: <i>one <b>brother</b></i> ↔ <i>two <b>brothers</b></i>. Больше одного → -s.",
        rule: "После числа >1 → мн.число.",
      },
    },
  },
  {
    topic: "numbers-time",
    kind: "numbers-time",
    ru: "Урок в девять.",
    correct: ["The", "lesson", "is", "at", "nine"],
    bank: ["The", "lesson", "is", "at", "nine", "on", "in"],
    subject: "lesson",
    whyOk: "Верно! «В (такое-то время)» → предлог <b>at</b>: <b>at nine</b>.",
    bridge:
      "С точным временем используют предлог <b>at</b>: at nine, at five o'clock. «Урок в девять» = <b>The lesson is at nine</b>.",
    rule: "Время суток/час → <b>at</b>: at nine, at noon, at midnight.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: время → <b>at</b> nine.",
        bridge:
          "Предлог времени для часа — <b>at</b>. <b>The lesson is at nine</b>.",
        rule: "Точное время → <b>at</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>at nine</i>, <i>at seven</i>, <i>at noon</i> — время через <b>at</b>.",
        bridge:
          "Ряд: <i><b>at</b> nine</i> · <i><b>at</b> six o'clock</i>. «В столько-то» → <b>at</b>.",
        rule: "«В (час)» → <b>at</b>.",
      },
    },
  },
];

// ── Wh-questions: вопросы What/Where/When/Who ───────────────────────────────
export const WH_QUESTIONS: LessonItem[] = [
  {
    topic: "wh-questions",
    kind: "wh-questions",
    ru: "Где ты живёшь?",
    correct: ["Where", "do", "you", "live"],
    bank: ["Where", "do", "you", "live", "does", "What"],
    subject: "you",
    whyOk: "Верно! Вопрос с Where требует <b>do</b>: <b>Where do you live?</b>",
    bridge:
      "В английском вопросе нужен помощник <b>do</b>: <i>Where <b>do</b> you live?</i>. Порядок: вопрос-слово + do + кто + действие. По-русски «где ты живёшь» — без do, в английском он обязателен.",
    rule: "Wh-вопрос: <b>Where/What/When + do/does + подлежащее + глагол</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Where + <b>do</b> + you + live.",
        bridge:
          "Схема вопроса: <b>Wh + do + кто + глагол</b>. Where + do + you + live. <b>Where do you live?</b>",
        rule: "Wh + <b>do</b> + подлежащее + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>Where do you live</i>, <i>What do you want</i> — везде <b>do</b>.",
        bridge:
          "Ряд: <i>Where <b>do</b> you work?</i> · <i>What <b>do</b> you like?</i>. Помощник <b>do</b> обязателен.",
        rule: "Вопрос → добавь <b>do</b>.",
      },
    },
  },
  {
    topic: "wh-questions",
    kind: "wh-questions",
    ru: "Что это?",
    correct: ["What", "is", "this"],
    bank: ["What", "is", "this", "are", "Where"],
    subject: "this",
    whyOk: "Верно! С глаголом <b>be</b> do не нужен: <b>What is this?</b>",
    bridge:
      "Если в вопросе глагол <b>be</b> (is/are), помощник do НЕ нужен — be сам становится вопросом: <i>What <b>is</b> this?</i>. Порядок: Wh + be + подлежащее.",
    rule: "Wh + <b>be</b> + подлежащее (без do): What is this? Where are you?",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: What + <b>is</b> + this (be, без do).",
        bridge:
          "С be вопрос строится перестановкой: <b>Wh + be + кто</b>. What + is + this. <b>What is this?</b>",
        rule: "Есть be → do не нужен.",
      },
      "examples-first": {
        whyOk: "Верно! <i>What is this</i>, <i>Where are you</i> — с be без do.",
        bridge:
          "Сравни: <i>What <b>do</b> you want?</i> (обычный глагол) ↔ <i>What <b>is</b> this?</i> (be). С be — без do.",
        rule: "be в вопросе → без do.",
      },
    },
  },
  {
    topic: "wh-questions",
    kind: "wh-questions",
    ru: "Когда ты приходишь?",
    correct: ["When", "do", "you", "come"],
    bank: ["When", "do", "you", "come", "does", "What"],
    subject: "you",
    whyOk: "Верно! «Когда» → <b>When</b> + do: <b>When do you come?</b>",
    bridge:
      "«Когда» = <b>When</b>, и дальше та же схема вопроса с помощником <b>do</b>: When + do + you + come. <b>When do you come?</b>",
    rule: "<b>When + do + подлежащее + глагол</b>. When do you come?",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: When + <b>do</b> + you + come.",
        bridge:
          "Схема: <b>Wh + do + кто + глагол</b>. When + do + you + come. <b>When do you come?</b>",
        rule: "When + <b>do</b> + подлежащее + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>When do you come</i>, <i>When do they start</i> — When + do.",
        bridge:
          "Ряд: <i>When <b>do</b> you eat?</i> · <i>When <b>do</b> we meet?</i>. Помощник <b>do</b> на месте.",
        rule: "When-вопрос → <b>do</b>.",
      },
    },
  },
];
