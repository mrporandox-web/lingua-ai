// Контент B1 · Юнит 3 «Пассив и косвенная речь» (кураторский, см. content.ts).
// Темы: passive-present, passive-past, reported-speech, reported-questions.

import type { LessonItem } from "./items";

// ── Passive Present: is/are + V3 ───────────────────────────────────────────
export const PASSIVE_PRESENT: LessonItem[] = [
  {
    topic: "passive-present",
    kind: "passive-present",
    ru: "Эта машина производится в Германии.",
    correct: ["This", "car", "is", "made", "in", "Germany"],
    bank: ["This", "car", "is", "made", "in", "Germany", "makes", "are"],
    subject: "car",
    whyOk: "Верно! Пассив в настоящем → <b>is + V3</b>: <b>is made</b>.",
    bridge:
      "В пассиве важен не тот, кто делает, а объект. «Машина производится» = с ней что-то делают. В настоящем: <b>am/is/are + третья форма</b>. <b>This car is made in Germany</b>.",
    rule: "Present Passive: <b>am/is/are + V3</b>. is made, are used, am called.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: car ед.ч. → <b>is made</b>.",
        bridge:
          "Формула пассива: объект + be + V3. This car — ед.ч., значит is. make → made. Получаем <b>is made</b>.",
        rule: "<b>object + is/are + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is made</i>, <i>is called</i>, <i>is used</i> — это present passive.",
        bridge:
          "Сравни: <i>They <b>make</b> cars</i> (актив) ↔ <i>Cars <b>are made</b></i> (пассив). В центре объект.",
        rule: "Объект в центре → <b>be + V3</b>.",
      },
    },
  },
  {
    topic: "passive-present",
    kind: "passive-present",
    ru: "Здесь говорят по-английски.",
    correct: ["English", "is", "spoken", "here"],
    bank: ["English", "is", "spoken", "here", "speaks", "are"],
    subject: "English",
    whyOk: "Верно! «По-английски говорят» → <b>English is spoken</b>.",
    bridge:
      "В русском можно безлично: «здесь говорят». Английский часто делает пассив: язык как объект + be + V3. speak → spoken: <b>English is spoken here</b>.",
    rule: "Безличное «говорят/делают» часто переводим пассивом: <b>is/are + V3</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: English ед.ч. → <b>is spoken</b>.",
        bridge:
          "English — объект действия. Для ед.ч. берём is, третья форма speak — spoken. <b>English is spoken here</b>.",
        rule: "ед.ч. → <b>is + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>English is spoken here</i>, <i>French is used there</i>.",
        bridge:
          "Когда по-русски «здесь говорят/используют», в английском удобно поставить объект первым: <b>English is spoken</b>.",
        rule: "«говорят» без автора → passive.",
      },
    },
  },
  {
    topic: "passive-present",
    kind: "passive-present",
    ru: "Комнаты убирают каждый день.",
    correct: ["The", "rooms", "are", "cleaned", "every", "day"],
    bank: ["The", "rooms", "are", "cleaned", "every", "day", "is", "clean"],
    subject: "rooms",
    whyOk: "Верно! rooms мн.ч. → <b>are cleaned</b>.",
    bridge:
      "«Комнаты убирают» — не важно, кто именно. Важно, что комнаты получают действие. Множественное число требует <b>are</b>: <b>The rooms are cleaned every day</b>.",
    rule: "Мн.ч. в Present Passive → <b>are + V3</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: rooms → are, clean → cleaned.",
        bridge:
          "Объект во множественном числе: rooms. Поэтому be = are. Глагол в третьей форме: cleaned.",
        rule: "plural object → <b>are + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>rooms are cleaned</i>, <i>emails are sent</i>, <i>cars are made</i>.",
        bridge:
          "Ряд пассива: объект-мн.ч. + <b>are</b> + V3. The rooms are cleaned every day.",
        rule: "много объектов → <b>are</b>.",
      },
    },
  },
];

// ── Passive Past: was/were + V3 ────────────────────────────────────────────
export const PASSIVE_PAST: LessonItem[] = [
  {
    topic: "passive-past",
    kind: "passive-past",
    ru: "Окно разбили вчера.",
    correct: ["The", "window", "was", "broken", "yesterday"],
    bank: ["The", "window", "was", "broken", "yesterday", "broke", "were"],
    subject: "window",
    whyOk: "Верно! Пассив в прошлом → <b>was + V3</b>: <b>was broken</b>.",
    bridge:
      "В прошлом пассив строится через <b>was/were + третья форма</b>. Окно — ед.ч., значит <b>was</b>. break → broken: <b>The window was broken yesterday</b>.",
    rule: "Past Passive: <b>was/were + V3</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: window ед.ч. → <b>was broken</b>.",
        bridge:
          "Объект + was/were + V3. The window — ед.ч.; break в третьей форме — broken. Поэтому was broken.",
        rule: "ед.ч. в прошлом пассиве → <b>was + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>was broken</i>, <i>was built</i>, <i>was written</i> — past passive.",
        bridge:
          "Сравни: <i>Someone broke the window</i> ↔ <i>The window <b>was broken</b></i>. Автор не в центре.",
        rule: "прошлый пассив → <b>was/were + V3</b>.",
      },
    },
  },
  {
    topic: "passive-past",
    kind: "passive-past",
    ru: "Письма отправили утром.",
    correct: ["The", "letters", "were", "sent", "in", "the", "morning"],
    bank: ["The", "letters", "were", "sent", "in", "the", "morning", "was", "send"],
    subject: "letters",
    whyOk: "Верно! letters мн.ч. → <b>were sent</b>.",
    bridge:
      "Письма — объект во множественном числе, действие уже произошло. Поэтому past passive: <b>were + V3</b>. send → sent: <b>The letters were sent in the morning</b>.",
    rule: "Мн.ч. в Past Passive → <b>were + V3</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: letters → were, send → sent.",
        bridge:
          "Шаги: объект letters во мн.ч. → were. Глагол send в V3 → sent. Время: in the morning.",
        rule: "plural object → <b>were + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>letters were sent</i>, <i>tickets were bought</i>, <i>rooms were cleaned</i>.",
        bridge:
          "Ряд: объект-мн.ч. + <b>were</b> + V3. Так показываем, что действие сделали с объектом.",
        rule: "много объектов в прошлом → <b>were</b>.",
      },
    },
  },
  {
    topic: "passive-past",
    kind: "passive-past",
    ru: "Эту книгу написали в 1998 году.",
    correct: ["This", "book", "was", "written", "in", "1998"],
    bank: ["This", "book", "was", "written", "in", "1998", "wrote", "were"],
    subject: "book",
    whyOk: "Верно! book ед.ч. → <b>was written</b>.",
    bridge:
      "Книга — объект, автор не назван. В прошлом для ед.ч. берём <b>was</b>, третья форма write — <b>written</b>: <b>This book was written in 1998</b>.",
    rule: "<b>was written</b> = «было написано». write → written.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: was + <b>written</b>.",
        bridge:
          "This book — ед.ч., значит was. Глагол write в третьей форме — written. Это и есть past passive.",
        rule: "was + V3 для ед.ч. в прошлом.",
      },
      "examples-first": {
        whyOk: "Верно! <i>was written</i>, <i>was made</i>, <i>was found</i>.",
        bridge:
          "Если можно сказать «книгу написали», но автор не важен, английский ставит книгу первой: <b>This book was written</b>.",
        rule: "объект + was/were + V3.",
      },
    },
  },
];

// ── Reported Speech: he said that… ─────────────────────────────────────────
export const REPORTED_SPEECH: LessonItem[] = [
  {
    topic: "reported-speech",
    kind: "reported-speech",
    ru: "Он сказал, что устал.",
    correct: ["He", "said", "that", "he", "was", "tired"],
    bank: ["He", "said", "that", "he", "was", "tired", "is", "says"],
    subject: "He",
    whyOk: "Верно! В косвенной речи после said часто сдвигаем время назад: <b>is → was</b>.",
    bridge:
      "Прямая речь: <i>I am tired</i>. Передаём через past-глагол <b>said</b> — время обычно сдвигается назад: <b>He said that he was tired</b>.",
    rule: "Reported speech после said: present → past. <b>am/is → was</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: said + that + he <b>was</b> tired.",
        bridge:
          "Схема: кто + said + that + фраза со сдвигом времени. am/is в прямой речи становится was.",
        rule: "said that + past.",
      },
      "examples-first": {
        whyOk: "Верно! <i>He said that he was tired</i>, <i>She said that she was busy</i>.",
        bridge:
          "Сравни: <i>He says: I <b>am</b> tired</i> ↔ <i>He said that he <b>was</b> tired</i>.",
        rule: "said → время назад.",
      },
    },
  },
  {
    topic: "reported-speech",
    kind: "reported-speech",
    ru: "Она сказала мне, что живёт в Лондоне.",
    correct: ["She", "told", "me", "that", "she", "lived", "in", "London"],
    bank: ["She", "told", "me", "that", "she", "lived", "in", "London", "lives", "said"],
    subject: "She",
    whyOk: "Верно! <b>tell</b> с адресатом → <b>told me</b>, lives сдвигается в <b>lived</b>.",
    bridge:
      "Если есть адресат («мне»), используем <b>told me</b>, а не said me. В косвенной речи после told время сдвигается: lives → lived.",
    rule: "<b>told + object + that</b>; present simple → past simple.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>told me</b> + that she lived.",
        bridge:
          "tell требует адресата: told me/him/us. Дальше that и сдвиг времени: she lives → she lived.",
        rule: "told me that + past.",
      },
      "examples-first": {
        whyOk: "Верно! <i>She told me that she lived in London</i>.",
        bridge:
          "Пара: <i>She said that…</i> без адресата ↔ <i>She told me that…</i> с адресатом.",
        rule: "said that / told me that.",
      },
    },
  },
  {
    topic: "reported-speech",
    kind: "reported-speech",
    ru: "Они сказали, что помогут нам.",
    correct: ["They", "said", "that", "they", "would", "help", "us"],
    bank: ["They", "said", "that", "they", "would", "help", "us", "will", "helps"],
    subject: "They",
    whyOk: "Верно! В косвенной речи <b>will</b> обычно сдвигается в <b>would</b>.",
    bridge:
      "Прямая речь: <i>We will help you</i>. Передаём как сказанное в прошлом: <b>They said that they would help us</b>. will → would.",
    rule: "Reported speech: <b>will → would</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: said that they <b>would help</b>.",
        bridge:
          "После said сдвигаем будущее: will становится would. После would глагол простой: help.",
        rule: "<b>would + V</b> после reported will.",
      },
      "examples-first": {
        whyOk: "Верно! <i>they would help</i>, <i>she would call</i> — reported future.",
        bridge:
          "Сравни: <i>They will help</i> ↔ <i>They said that they <b>would</b> help</i>.",
        rule: "will в прямой речи → would в косвенной.",
      },
    },
  },
];

// ── Reported Questions: asked if/where… ────────────────────────────────────
export const REPORTED_QUESTIONS: LessonItem[] = [
  {
    topic: "reported-questions",
    kind: "reported-questions",
    ru: "Она спросила, готов ли я.",
    correct: ["She", "asked", "if", "I", "was", "ready"],
    bank: ["She", "asked", "if", "I", "was", "ready", "am", "that"],
    subject: "She",
    whyOk: "Верно! В косвенном yes/no-вопросе нужен <b>if</b> и прямой порядок слов.",
    bridge:
      "Прямой вопрос: <i>Are you ready?</i>. В косвенной речи нет вопросительного порядка: <b>She asked if I was ready</b>. are/am сдвигается в was.",
    rule: "Reported yes/no question: <b>asked if + subject + verb</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: asked + <b>if</b> + I was ready.",
        bridge:
          "Если вопрос без wh-слова, ставим if/whether. Дальше обычный порядок: I was ready, не was I ready.",
        rule: "asked if + прямой порядок.",
      },
      "examples-first": {
        whyOk: "Верно! <i>asked if I was ready</i>, <i>asked if she knew</i>.",
        bridge:
          "Сравни: <i>Are you ready?</i> ↔ <i>She asked if I <b>was</b> ready</i>. Инверсия исчезает.",
        rule: "в косвенном вопросе нет инверсии.",
      },
    },
  },
  {
    topic: "reported-questions",
    kind: "reported-questions",
    ru: "Он спросил, где я живу.",
    correct: ["He", "asked", "where", "I", "lived"],
    bank: ["He", "asked", "where", "I", "lived", "live", "did"],
    subject: "He",
    whyOk: "Верно! Wh-вопрос в косвенной речи сохраняет <b>where</b>, но порядок прямой: <b>I lived</b>.",
    bridge:
      "Прямой вопрос: <i>Where do you live?</i>. В reported question убираем do/does и ставим обычный порядок: <b>He asked where I lived</b>.",
    rule: "Reported wh-question: <b>asked + wh + subject + verb</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: where + I <b>lived</b>.",
        bridge:
          "Wh-слово остаётся, но вопросительный порядок исчезает. После asked время сдвигается: live → lived.",
        rule: "where/what/why + subject + past.",
      },
      "examples-first": {
        whyOk: "Верно! <i>asked where I lived</i>, <i>asked what I wanted</i>.",
        bridge:
          "Сравни: <i>Where do you live?</i> ↔ <i>He asked where I lived</i>. Нет do.",
        rule: "косвенный wh-вопрос → без do/does.",
      },
    },
  },
  {
    topic: "reported-questions",
    kind: "reported-questions",
    ru: "Они спросили, чего мы хотим.",
    correct: ["They", "asked", "what", "we", "wanted"],
    bank: ["They", "asked", "what", "we", "wanted", "want", "did"],
    subject: "They",
    whyOk: "Верно! <b>What we wanted</b> — прямой порядок внутри косвенного вопроса.",
    bridge:
      "Внутри reported question порядок как в утверждении: <b>we wanted</b>, а не did we want. После asked время сдвигается: want → wanted.",
    rule: "Косвенный вопрос: <b>wh + subject + verb</b>, без do/did.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: asked what + we wanted.",
        bridge:
          "Wh-слово what остаётся. Дальше подлежащее we и глагол wanted. Вспомогательный did не нужен.",
        rule: "reported question = прямой порядок слов.",
      },
      "examples-first": {
        whyOk: "Верно! <i>what we wanted</i>, <i>where they lived</i>, <i>why she left</i>.",
        bridge:
          "Ряд: <i>What do you want?</i> → <i>They asked what we wanted</i>. do/did исчезает.",
        rule: "wh + кто + что сделал.",
      },
    },
  },
];
