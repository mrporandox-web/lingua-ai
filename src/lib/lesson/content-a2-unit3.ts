// Контент A2 · Юнит 3 «Сравнение и количество» (кураторский, см. content.ts).
// Темы: comparatives, superlatives, quantifiers, countable.

import type { LessonItem } from "./items";

// ── Сравнительная степень ───────────────────────────────────────────────────
export const COMPARATIVES: LessonItem[] = [
  {
    topic: "comparatives",
    kind: "comparatives",
    ru: "Этот дом больше.",
    correct: ["This", "house", "is", "bigger"],
    bank: ["This", "house", "is", "bigger", "big", "more"],
    subject: "house",
    whyOk: "Верно! Короткое прилагательное → <b>-er</b>: big → <b>bigger</b>.",
    bridge:
      "Для коротких прилагательных сравнительная степень — окончание <b>-er</b>: big → <b>bigger</b>, small → smaller. (Согласная удваивается: big→bigger.)",
    rule: "Короткие прилагательные: <b>+er</b>. big→bigger, fast→faster.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: big + <b>-er</b> = bigger.",
        bridge:
          "Короткое прилагательное → основа + <b>er</b>. big → bigger. <b>This house is bigger</b>.",
        rule: "Короткое прил. → <b>+er</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>bigger</i>, <i>smaller</i>, <i>faster</i> — короткие на -er.",
        bridge:
          "Ряд: <i>big → <b>bigger</b></i> · <i>old → <b>older</b></i>. Короткое — хвост <b>-er</b>.",
        rule: "Коротко → <b>-er</b>.",
      },
    },
  },
  {
    topic: "comparatives",
    kind: "comparatives",
    ru: "Эта книга интереснее.",
    correct: ["This", "book", "is", "more", "interesting"],
    bank: ["This", "book", "is", "more", "interesting", "interestinger"],
    subject: "book",
    whyOk: "Верно! Длинное прилагательное → <b>more</b> (не -er): <b>more interesting</b>.",
    bridge:
      "Для длинных прилагательных (2+ слога) сравнение строят словом <b>more</b>: <b>more interesting</b>, не «interestinger».",
    rule: "Длинные прилагательные: <b>more</b> + прил. more expensive, more useful.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>more</b> + interesting.",
        bridge:
          "Длинное прил. → <b>more</b> перед ним. <b>This book is more interesting</b>.",
        rule: "Длинное прил. → <b>more</b> + прил.",
      },
      "examples-first": {
        whyOk: "Верно! <i>more interesting</i>, <i>more beautiful</i>, <i>more difficult</i>.",
        bridge:
          "Сравни: <i>bigg<b>er</b></i> (короткое) ↔ <i><b>more</b> interesting</i> (длинное).",
        rule: "Длинное → <b>more</b>.",
      },
    },
  },
  {
    topic: "comparatives",
    kind: "comparatives",
    ru: "Сегодня жарче, чем вчера.",
    correct: ["Today", "is", "hotter", "than", "yesterday"],
    bank: ["Today", "is", "hotter", "than", "yesterday", "hot", "then"],
    subject: "Today",
    whyOk: "Верно! Сравнение с чем-то → <b>than</b>: <b>hotter than yesterday</b>.",
    bridge:
      "Когда сравниваем «X-ее, ЧЕМ Y», используют <b>than</b> (не «then»). И hot удваивает t: <b>hotter</b>. <b>Today is hotter than yesterday</b>.",
    rule: "Сравнение «чем» → <b>than</b>. hotter/bigger/older + than.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: hotter + <b>than</b>.",
        bridge:
          "Сравнительная + <b>than</b> + второй объект. hot → hotter (удвоение t), than yesterday. <b>Today is hotter than yesterday</b>.",
        rule: "<b>сравнит. + than + объект</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>hotter than</i>, <i>bigger than</i>, <i>older than</i> — «чем» = than.",
        bridge:
          "Ряд: <i>faster <b>than</b> me</i> · <i>better <b>than</b> before</i>. «Чем» → <b>than</b>.",
        rule: "«Чем» → <b>than</b>.",
      },
    },
  },
];

// ── Превосходная степень ────────────────────────────────────────────────────
export const SUPERLATIVES: LessonItem[] = [
  {
    topic: "superlatives",
    kind: "superlatives",
    ru: "Это самый большой дом.",
    correct: ["This", "is", "the", "biggest", "house"],
    bank: ["This", "is", "the", "biggest", "house", "bigger", "big"],
    subject: "This",
    whyOk: "Верно! «Самый» → <b>the + -est</b>: the <b>biggest</b>.",
    bridge:
      "Превосходная степень («самый») у коротких прилагательных — <b>the + -est</b>: big → <b>the biggest</b>. Артикль <b>the</b> обязателен.",
    rule: "Короткие: <b>the + прил-est</b>. the biggest, the fastest.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: the + big<b>gest</b>.",
        bridge:
          "Короткое прил. в превосходной → <b>the + основа + est</b>. big → the biggest. <b>This is the biggest house</b>.",
        rule: "<b>the + прил-est</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>the biggest</i>, <i>the smallest</i>, <i>the fastest</i> — the + -est.",
        bridge:
          "Сравни: <i>bigg<b>er</b></i> (сравнит.) ↔ <i>the bigg<b>est</b></i> (превосх.).",
        rule: "«Самый» (коротк.) → <b>the …est</b>.",
      },
    },
  },
  {
    topic: "superlatives",
    kind: "superlatives",
    ru: "Она самая умная.",
    correct: ["She", "is", "the", "smartest"],
    bank: ["She", "is", "the", "smartest", "most", "smart"],
    subject: "She",
    whyOk: "Верно! the <b>smartest</b> — «самая умная».",
    bridge:
      "smart короткое → <b>the smartest</b>. Не «the most smart» (most — для длинных прилагательных).",
    rule: "Короткие → <b>the …est</b>; длинные → the most + прил.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: the smart<b>est</b>.",
        bridge:
          "smart короткое → the + smart + est = <b>the smartest</b>. <b>She is the smartest</b>.",
        rule: "Короткое → the …est.",
      },
      "examples-first": {
        whyOk: "Верно! <i>the smartest</i>, <i>the tallest</i>, <i>the nicest</i>.",
        bridge:
          "Ряд: <i>the strong<b>est</b></i> · <i>the young<b>est</b></i>. Короткое → the …est.",
        rule: "the + коротк.-est.",
      },
    },
  },
  {
    topic: "superlatives",
    kind: "superlatives",
    ru: "Это лучший день.",
    correct: ["This", "is", "the", "best", "day"],
    bank: ["This", "is", "the", "best", "day", "goodest", "good"],
    subject: "This",
    whyOk: "Верно! good — особое: превосходная <b>the best</b> (не goodest).",
    bridge:
      "good — исключение: сравнительная better, превосходная <b>the best</b>. «Лучший день» = <b>the best day</b>.",
    rule: "Исключения: good→the best, bad→the worst.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: good → <b>the best</b>.",
        bridge:
          "good не по правилу: превосходная — <b>the best</b>. <b>This is the best day</b>.",
        rule: "good → <b>the best</b> (заучить).",
      },
      "examples-first": {
        whyOk: "Верно! <i>good → the best</i>, <i>bad → the worst</i>.",
        bridge:
          "Ряд исключений: <i>good → <b>best</b></i> · <i>bad → <b>worst</b></i>.",
        rule: "good/bad → best/worst.",
      },
    },
  },
];

// ── some / any / much / many ────────────────────────────────────────────────
export const QUANTIFIERS: LessonItem[] = [
  {
    topic: "quantifiers",
    kind: "quantifiers",
    ru: "У меня есть немного денег.",
    correct: ["I", "have", "some", "money"],
    bank: ["I", "have", "some", "money", "any", "many"],
    subject: "I",
    whyOk: "Верно! В утверждении «немного/несколько» → <b>some</b>: <b>some money</b>.",
    bridge:
      "В утвердительных предложениях для «немного/несколько» берут <b>some</b> (any — для вопросов и отрицаний). <b>I have some money</b>.",
    rule: "<b>some</b> — в утверждениях; <b>any</b> — в вопросах/отрицаниях.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: утверждение → <b>some</b>.",
        bridge:
          "Тип предложения утвердительный → <b>some</b>. <b>I have some money</b>.",
        rule: "Утверждение → <b>some</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>some money</i>, <i>some time</i>, <i>some friends</i> — в утверждениях some.",
        bridge:
          "Сравни: <i>I have <b>some</b></i> (утв.) ↔ <i>Do you have <b>any</b>?</i> (вопрос).",
        rule: "Есть/имею → <b>some</b>.",
      },
    },
  },
  {
    topic: "quantifiers",
    kind: "quantifiers",
    ru: "У тебя есть вопросы?",
    correct: ["Do", "you", "have", "any", "questions"],
    bank: ["Do", "you", "have", "any", "questions", "some", "much"],
    subject: "you",
    whyOk: "Верно! В вопросе → <b>any</b>: <b>any questions</b>.",
    bridge:
      "В вопросах (и отрицаниях) для «какие-нибудь/сколько-нибудь» используют <b>any</b>, не some. <b>Do you have any questions?</b>",
    rule: "Вопрос/отрицание → <b>any</b>. Do you have any…? I don't have any…",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: вопрос → <b>any</b>.",
        bridge:
          "Предложение-вопрос → <b>any</b>. Do you have <b>any</b> questions? <b>Do you have any questions?</b>",
        rule: "Вопрос → <b>any</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>any questions</i>, <i>any money</i>, <i>any ideas</i> — в вопросах any.",
        bridge:
          "Сравни: <i>I have <b>some</b></i> ↔ <i>Do you have <b>any</b>?</i>. Вопрос → any.",
        rule: "Спрашиваешь → <b>any</b>.",
      },
    },
  },
  {
    topic: "quantifiers",
    kind: "quantifiers",
    ru: "Здесь не много людей.",
    correct: ["There", "aren't", "many", "people"],
    bank: ["There", "aren't", "many", "people", "much", "any"],
    subject: "people",
    whyOk: "Верно! С исчисляемым (people) → <b>many</b>: <b>many people</b>.",
    bridge:
      "<b>many</b> — для того, что можно посчитать (people, books), <b>much</b> — для неисчисляемого (water, time). Люди считаются → <b>many people</b>.",
    rule: "<b>many</b> + исчисляемое (people), <b>much</b> + неисчисляемое (water).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: исчисляемое → <b>many</b>.",
        bridge:
          "people можно посчитать → <b>many</b> (не much). <b>There aren't many people</b>.",
        rule: "Считается → <b>many</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>many people</i>, <i>many books</i>, <i>many cars</i> — счётное → many.",
        bridge:
          "Сравни: <i><b>many</b> people</i> (счёт) ↔ <i><b>much</b> water</i> (масса).",
        rule: "Штуки → <b>many</b>.",
      },
    },
  },
];

// ── countable / uncountable: a lot of vs much/many ──────────────────────────
export const COUNTABLE: LessonItem[] = [
  {
    topic: "countable",
    kind: "countable",
    ru: "У меня много друзей.",
    correct: ["I", "have", "a", "lot", "of", "friends"],
    bank: ["I", "have", "a", "lot", "of", "friends", "much", "many"],
    subject: "I",
    whyOk: "Верно! «Много» в утверждении удобно сказать <b>a lot of</b> (подходит всему).",
    bridge:
      "<b>a lot of</b> = «много» и для счётного, и для несчётного, и звучит естественно в утверждениях. <b>I have a lot of friends</b>.",
    rule: "<b>a lot of</b> + любое существительное (утверждения). a lot of friends/water.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>a lot of</b> + friends.",
        bridge:
          "Универсальное «много» → <b>a lot of</b> + сущ. <b>I have a lot of friends</b>.",
        rule: "<b>a lot of</b> + сущ.",
      },
      "examples-first": {
        whyOk: "Верно! <i>a lot of friends</i>, <i>a lot of money</i>, <i>a lot of time</i>.",
        bridge:
          "Ряд: <i>a lot of <b>books</b></i> · <i>a lot of <b>water</b></i>. Подходит всему.",
        rule: "«Много» (утв.) → <b>a lot of</b>.",
      },
    },
  },
  {
    topic: "countable",
    kind: "countable",
    ru: "Здесь много воды.",
    correct: ["There", "is", "a", "lot", "of", "water"],
    bank: ["There", "is", "a", "lot", "of", "water", "are", "many"],
    subject: "water",
    whyOk: "Верно! water неисчисляемое → <b>is</b> + <b>a lot of water</b>.",
    bridge:
      "water нельзя посчитать → глагол <b>is</b> (единственное), и «много» = <b>a lot of</b> (или much). <b>There is a lot of water</b>.",
    rule: "Неисчисляемое → <b>is</b> + a lot of / much.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: water → <b>is</b> + a lot of.",
        bridge:
          "Неисчисляемое water берёт <b>is</b> и <b>a lot of</b>. <b>There is a lot of water</b>.",
        rule: "Несчётное → is + a lot of.",
      },
      "examples-first": {
        whyOk: "Верно! <i>a lot of water</i>, <i>a lot of milk</i>, <i>a lot of money</i> — несчётное.",
        bridge:
          "Сравни: <i>there <b>are</b> a lot of cars</i> ↔ <i>there <b>is</b> a lot of water</i>.",
        rule: "Несчётное → is.",
      },
    },
  },
  {
    topic: "countable",
    kind: "countable",
    ru: "Сколько это стоит?",
    correct: ["How", "much", "is", "it"],
    bank: ["How", "much", "is", "it", "many", "are"],
    subject: "it",
    whyOk: "Верно! О цене/количестве несчётного спрашивают <b>How much</b>.",
    bridge:
      "<b>How much</b> — «сколько» для денег/несчётного («How much is it?» = сколько стоит). <b>How many</b> — для штук.",
    rule: "<b>How much</b> + цена/несчётное; <b>How many</b> + штуки.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: цена → <b>How much</b>.",
        bridge:
          "«Сколько стоит» → <b>How much</b> is it. <b>How much is it?</b>",
        rule: "Цена → <b>How much</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>How much is it</i>, <i>How much water</i> — деньги/несчётное.",
        bridge:
          "Сравни: <i><b>How much</b> money?</i> ↔ <i><b>How many</b> books?</i>.",
        rule: "Деньги/масса → <b>How much</b>.",
      },
    },
  },
];
