// Контент B1 · Юнит 4 «Герундий и связки» (кураторский, см. content.ts).
// Темы: gerund-infinitive, relative-clauses, modals-deduction, so-such.

import type { LessonItem } from "./items";

// ── Gerund / Infinitive: enjoy doing / want to do ──────────────────────────
export const GERUND_INFINITIVE: LessonItem[] = [
  {
    topic: "gerund-infinitive",
    kind: "gerund-infinitive",
    ru: "Мне нравится плавать.",
    correct: ["I", "enjoy", "swimming"],
    bank: ["I", "enjoy", "swimming", "to", "swim", "swims"],
    subject: "I",
    whyOk: "Верно! После <b>enjoy</b> нужен герундий: <b>enjoy swimming</b>.",
    bridge:
      "Некоторые глаголы требуют после себя форму <b>-ing</b>. <b>Enjoy</b> — один из них: не enjoy to swim, а <b>I enjoy swimming</b>.",
    rule: "После enjoy/avoid/finish → <b>V-ing</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: enjoy + <b>swimming</b>.",
        bridge:
          "Правило управления: enjoy всегда тянет форму -ing. Берём swim → swimming и ставим после enjoy.",
        rule: "<b>enjoy + V-ing</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>enjoy swimming</i>, <i>enjoy reading</i>, <i>enjoy cooking</i>.",
        bridge:
          "Ряд: <i>I enjoy <b>reading</b></i> · <i>She enjoys <b>traveling</b></i>. После enjoy всегда -ing.",
        rule: "enjoy → -ing.",
      },
    },
  },
  {
    topic: "gerund-infinitive",
    kind: "gerund-infinitive",
    ru: "Я хочу выучить английский.",
    correct: ["I", "want", "to", "learn", "English"],
    bank: ["I", "want", "to", "learn", "English", "learning", "learns"],
    subject: "I",
    whyOk: "Верно! После <b>want</b> нужен инфинитив: <b>want to learn</b>.",
    bridge:
      "<b>Want</b> работает иначе, чем enjoy: после него ставим <b>to + глагол</b>. Поэтому «хочу выучить» = <b>I want to learn English</b>.",
    rule: "После want/need/decide → <b>to + V</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: want + <b>to learn</b>.",
        bridge:
          "Проверяем глагол-управитель: want требует инфинитив. Ставим to, потом базовый глагол learn.",
        rule: "<b>want + to + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>want to learn</i>, <i>want to go</i>, <i>want to try</i>.",
        bridge:
          "Сравни: <i>enjoy <b>learning</b></i> ↔ <i>want <b>to learn</b></i>. Разные глаголы требуют разные формы.",
        rule: "want → to + V.",
      },
    },
  },
  {
    topic: "gerund-infinitive",
    kind: "gerund-infinitive",
    ru: "Он избегает говорить об этом.",
    correct: ["He", "avoids", "talking", "about", "it"],
    bank: ["He", "avoids", "talking", "about", "it", "to", "talk"],
    subject: "He",
    whyOk: "Верно! После <b>avoid</b> ставим <b>-ing</b>: <b>avoids talking</b>.",
    bridge:
      "Avoid — глагол из группы, после которой нужен герундий. Для he в Present Simple: avoids, а второй глагол в -ing: <b>He avoids talking about it</b>.",
    rule: "После avoid → <b>V-ing</b>. He avoids talking, not avoids to talk.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: avoids + <b>talking</b>.",
        bridge:
          "Два правила сразу: he → avoids с -s; после avoid → talking с -ing.",
        rule: "avoid + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>avoid talking</i>, <i>avoid making mistakes</i>.",
        bridge:
          "Ряд: <i>avoid <b>doing</b></i> · <i>finish <b>working</b></i> · <i>enjoy <b>reading</b></i>. Эта группа любит -ing.",
        rule: "avoid/finish/enjoy → -ing.",
      },
    },
  },
];

// ── Relative Clauses: who / that ───────────────────────────────────────────
export const RELATIVE_CLAUSES: LessonItem[] = [
  {
    topic: "relative-clauses",
    kind: "relative-clauses",
    ru: "Это человек, который мне помог.",
    correct: ["This", "is", "the", "man", "who", "helped", "me"],
    bank: ["This", "is", "the", "man", "who", "helped", "me", "which", "helps"],
    subject: "man",
    whyOk: "Верно! Для человека используем <b>who</b>: <b>the man who helped me</b>.",
    bridge:
      "Relative clause уточняет, о каком человеке речь. Для людей чаще всего берём <b>who</b>: <b>This is the man who helped me</b>.",
    rule: "Человек + <b>who</b> + действие.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: man → <b>who</b>.",
        bridge:
          "Сначала называем человека: the man. Потом относительное слово who и действие: helped me.",
        rule: "<b>person + who + verb</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>the man who helped me</i>, <i>the woman who called</i>.",
        bridge:
          "Ряд: <i>a teacher <b>who</b> explains well</i> · <i>a friend <b>who</b> listens</i>. Люди → who.",
        rule: "для людей → who.",
      },
    },
  },
  {
    topic: "relative-clauses",
    kind: "relative-clauses",
    ru: "Это книга, которую я купил вчера.",
    correct: ["This", "is", "the", "book", "that", "I", "bought", "yesterday"],
    bank: ["This", "is", "the", "book", "that", "I", "bought", "yesterday", "who", "buy"],
    subject: "book",
    whyOk: "Верно! Для вещи можно использовать <b>that</b>: <b>the book that I bought</b>.",
    bridge:
      "Когда уточняем предмет, удобно ставить <b>that</b>. После that идёт обычная мини-фраза: I bought yesterday.",
    rule: "Вещь + <b>that</b> + subject + verb.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: book → <b>that</b>.",
        bridge:
          "The book — предмет. Ставим that, потом кто что сделал: I bought yesterday.",
        rule: "<b>thing + that + clause</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>the book that I bought</i>, <i>the phone that I lost</i>.",
        bridge:
          "Сравни: человек → who, предмет → that/which. Здесь book, поэтому that.",
        rule: "предмет → that/which.",
      },
    },
  },
  {
    topic: "relative-clauses",
    kind: "relative-clauses",
    ru: "Я живу в доме, который построил мой отец.",
    correct: ["I", "live", "in", "the", "house", "that", "my", "father", "built"],
    bank: ["I", "live", "in", "the", "house", "that", "my", "father", "built", "who", "build"],
    subject: "I",
    whyOk: "Верно! <b>the house that my father built</b> уточняет, какой дом.",
    bridge:
      "Relative clause приклеивает уточнение к существительному. «Дом, который построил отец» = <b>the house that my father built</b>.",
    rule: "Предмет + <b>that</b> + обычный порядок слов.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: house + that + my father built.",
        bridge:
          "House — предмет, поэтому that. Внутри уточнения порядок как в утверждении: my father built.",
        rule: "that-clause уточняет предмет.",
      },
      "examples-first": {
        whyOk: "Верно! <i>the house that my father built</i>, <i>the song that she wrote</i>.",
        bridge:
          "Ряд: <i>the car that I bought</i> · <i>the place that we visited</i>. That соединяет предмет и уточнение.",
        rule: "that = «который/которую» для предметов.",
      },
    },
  },
];

// ── Modals of Deduction: must / can't / might ──────────────────────────────
export const MODALS_DEDUCTION: LessonItem[] = [
  {
    topic: "modals-deduction",
    kind: "modals-deduction",
    ru: "Он, должно быть, дома.",
    correct: ["He", "must", "be", "at", "home"],
    bank: ["He", "must", "be", "at", "home", "can", "is"],
    subject: "He",
    whyOk: "Верно! Логический вывод с высокой уверенностью → <b>must be</b>.",
    bridge:
      "<b>Must</b> здесь не «должен», а «должно быть / наверняка». После modal идёт базовый глагол: <b>He must be at home</b>.",
    rule: "Deduction: <b>must + V</b> = наверняка.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: must + <b>be</b>.",
        bridge:
          "Модальный глагол не меняется по лицам. После must ставим базовую форму be, не is.",
        rule: "<b>must be</b>, not must is.",
      },
      "examples-first": {
        whyOk: "Верно! <i>He must be home</i>, <i>She must know</i> — сильный вывод.",
        bridge:
          "Сравни: <i>He is at home</i> (факт) ↔ <i>He <b>must be</b> at home</i> (вывод).",
        rule: "уверенный вывод → must.",
      },
    },
  },
  {
    topic: "modals-deduction",
    kind: "modals-deduction",
    ru: "Это не может быть правдой.",
    correct: ["It", "can't", "be", "true"],
    bank: ["It", "can't", "be", "true", "mustn't", "is"],
    subject: "It",
    whyOk: "Верно! Невозможность по логике → <b>can't be</b>.",
    bridge:
      "В deduction <b>can't</b> значит «не может быть / невозможно». После can't ставим базовый глагол: <b>It can't be true</b>.",
    rule: "<b>can't + V</b> = не может быть по логике.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: can't + <b>be</b>.",
        bridge:
          "Can't уже содержит отрицание и модальность. После него не ставим is, только базовое be.",
        rule: "<b>can't be</b>, not can't is.",
      },
      "examples-first": {
        whyOk: "Верно! <i>It can't be true</i>, <i>He can't know</i> — невозможно.",
        bridge:
          "Сравни: <i>It must be true</i> (наверняка) ↔ <i>It <b>can't be</b> true</i> (невозможно).",
        rule: "невозможно → can't.",
      },
    },
  },
  {
    topic: "modals-deduction",
    kind: "modals-deduction",
    ru: "Она, возможно, опоздала.",
    correct: ["She", "might", "be", "late"],
    bank: ["She", "might", "be", "late", "must", "is"],
    subject: "She",
    whyOk: "Верно! Слабая вероятность → <b>might be</b>.",
    bridge:
      "<b>Might</b> показывает осторожный вывод: возможно, но не уверен. После might тоже базовый глагол: <b>She might be late</b>.",
    rule: "<b>might + V</b> = возможно.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: might + <b>be</b>.",
        bridge:
          "Might слабее, чем must. Это не уверенность, а вероятность. После might ставим be.",
        rule: "might be = возможно.",
      },
      "examples-first": {
        whyOk: "Верно! <i>She might be late</i>, <i>They might know</i>.",
        bridge:
          "Шкала: <i>must be</i> = почти уверен, <i>might be</i> = возможно, <i>can't be</i> = невозможно.",
        rule: "слабый вывод → might.",
      },
    },
  },
];

// ── so / such: усиление ────────────────────────────────────────────────────
export const SO_SUCH: LessonItem[] = [
  {
    topic: "so-such",
    kind: "so-such",
    ru: "Она так устала.",
    correct: ["She", "is", "so", "tired"],
    bank: ["She", "is", "so", "tired", "such", "a"],
    subject: "She",
    whyOk: "Верно! Перед одним прилагательным используем <b>so</b>: <b>so tired</b>.",
    bridge:
      "<b>So</b> усиливает прилагательное или наречие без существительного: so tired, so fast, so difficult. Здесь только tired, значит <b>so</b>.",
    rule: "<b>so + adjective/adverb</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: so + tired.",
        bridge:
          "Проверка простая: после усилителя идёт только прилагательное tired, без существительного. Значит so.",
        rule: "so + adjective.",
      },
      "examples-first": {
        whyOk: "Верно! <i>so tired</i>, <i>so happy</i>, <i>so quickly</i>.",
        bridge:
          "Сравни: <i>so <b>tired</b></i> ↔ <i>such <b>a tired person</b></i>. Без noun → so.",
        rule: "без существительного → so.",
      },
    },
  },
  {
    topic: "so-such",
    kind: "so-such",
    ru: "Это такая хорошая идея.",
    correct: ["It", "is", "such", "a", "good", "idea"],
    bank: ["It", "is", "such", "a", "good", "idea", "so", "very"],
    subject: "It",
    whyOk: "Верно! Перед связкой adjective + noun используем <b>such a</b>: <b>such a good idea</b>.",
    bridge:
      "<b>Such</b> усиливает целую noun phrase: a good idea. Поэтому не so a good idea, а <b>such a good idea</b>.",
    rule: "<b>such + a/an + adjective + noun</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: such + a good idea.",
        bridge:
          "После усилителя есть существительное idea. Значит используем such, а артикль a остаётся перед прилагательным.",
        rule: "such a + adjective + noun.",
      },
      "examples-first": {
        whyOk: "Верно! <i>such a good idea</i>, <i>such a nice day</i>.",
        bridge:
          "Ряд: <i>such a <b>big problem</b></i> · <i>such an <b>easy question</b></i>. Есть noun → such.",
        rule: "есть существительное → such.",
      },
    },
  },
  {
    topic: "so-such",
    kind: "so-such",
    ru: "Это был такой долгий день.",
    correct: ["It", "was", "such", "a", "long", "day"],
    bank: ["It", "was", "such", "a", "long", "day", "so", "very"],
    subject: "It",
    whyOk: "Верно! <b>day</b> — существительное, поэтому <b>such a long day</b>.",
    bridge:
      "Если после усилителя идёт существительное, берём <b>such</b>. «Такой долгий день» = <b>such a long day</b>, потому что day — noun.",
    rule: "<b>such a/an + adjective + noun</b>; <b>so + adjective</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: such a + long day.",
        bridge:
          "Long — прилагательное, day — существительное. Эта связка требует such a, не so.",
        rule: "adjective + noun → such a/an.",
      },
      "examples-first": {
        whyOk: "Верно! <i>such a long day</i>, <i>such a hard test</i>.",
        bridge:
          "Сравни: <i>so <b>long</b></i> (только adjective) ↔ <i>such a <b>long day</b></i> (adjective + noun).",
        rule: "noun phrase → such.",
      },
    },
  },
];
