// Контент B2 · Юнит 1 «Прошлое и сожаления» (кураторский, см. content.ts).
// Темы: past-perfect-continuous, third-conditional, mixed-conditionals, wish-past-perfect.

import type { LessonItem } from "./items";

// ── Past Perfect Continuous: had been doing ─────────────────────────────────
export const PAST_PERFECT_CONTINUOUS: LessonItem[] = [
  {
    topic: "past-perfect-continuous",
    kind: "past-perfect-continuous",
    ru: "Я устал, потому что бегал.",
    correct: ["I", "was", "tired", "because", "I", "had", "been", "running"],
    bank: ["I", "was", "tired", "because", "I", "had", "been", "running", "ran", "have"],
    subject: "I",
    whyOk: "Верно! Длилось ДО момента в прошлом → <b>had been + -ing</b>: <b>had been running</b>.",
    bridge:
      "Past Perfect Continuous показывает действие, которое <b>шло какое-то время и привело к результату в прошлом</b>. Формула: <b>had been + глагол-ing</b>. Усталость — результат того, что <b>had been running</b>.",
    rule: "<b>had been + V-ing</b> — длилось до точки в прошлом (и дало результат).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>had been</b> + running.",
        bridge:
          "Формула: <b>had been + V-ing</b>. Для всех лиц — had been. <b>I had been running</b> → отсюда усталость.",
        rule: "<b>had been + V-ing</b> (причина результата в прошлом).",
      },
      "examples-first": {
        whyOk: "Верно! <i>had been running</i>, <i>had been working</i> — длилось до прошлого момента.",
        bridge:
          "Сравни: <i>I <b>was</b> running</i> (просто шло) ↔ <i>I <b>had been</b> running</i> (шло ДО и дало результат — усталость).",
        rule: "Длилось→результат в прошлом → <b>had been + -ing</b>.",
      },
    },
  },
  {
    topic: "past-perfect-continuous",
    kind: "past-perfect-continuous",
    ru: "Они работали весь день.",
    correct: ["They", "had", "been", "working", "all", "day"],
    bank: ["They", "had", "been", "working", "all", "day", "were", "worked"],
    subject: "They",
    whyOk: "Верно! Длительность до момента в прошлом → <b>had been working</b>.",
    bridge:
      "«Работали весь день» (к какому-то моменту в прошлом) — это Past Perfect Continuous: <b>had been working</b>. had been одинаково для всех лиц.",
    rule: "<b>had been + V-ing</b> + период (all day, for hours).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had been + working.",
        bridge:
          "they → had been (без изменений) + working. <b>They had been working all day</b>.",
        rule: "had been + V-ing для любого лица.",
      },
      "examples-first": {
        whyOk: "Верно! <i>had been working all day</i>, <i>had been waiting for hours</i>.",
        bridge:
          "Маркеры периода (all day, for hours) с прошлым процессом → <b>had been + -ing</b>.",
        rule: "Период до прошлого → had been + -ing.",
      },
    },
  },
  {
    topic: "past-perfect-continuous",
    kind: "past-perfect-continuous",
    ru: "Он читал час, когда я позвонил.",
    correct: ["He", "had", "been", "reading", "for", "an", "hour"],
    bank: ["He", "had", "been", "reading", "for", "an", "hour", "was", "read"],
    subject: "He",
    whyOk: "Верно! Сколько уже длилось к моменту в прошлом → <b>had been reading</b>.",
    bridge:
      "Когда хотим сказать, КАК ДОЛГО действие уже шло к моменту в прошлом (час — к моменту звонка) — Past Perfect Continuous: <b>had been reading for an hour</b>.",
    rule: "<b>had been + V-ing + for/since</b> — длительность к прошлой точке.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had been reading + for an hour.",
        bridge:
          "had been + reading + длительность (for an hour). <b>He had been reading for an hour</b>.",
        rule: "had been + V-ing + for …",
      },
      "examples-first": {
        whyOk: "Верно! <i>had been reading for an hour</i>, <i>had been living there for years</i>.",
        bridge:
          "Образец: <i>I <b>had been</b> waiting <b>for</b> ages when the bus came</i>. Длительность до прошлого.",
        rule: "«Уже сколько-то к моменту» → had been + -ing.",
      },
    },
  },
];

// ── Third Conditional: if + had done, would have done ───────────────────────
export const THIRD_CONDITIONAL: LessonItem[] = [
  {
    topic: "third-conditional",
    kind: "third-conditional",
    ru: "Если бы я знал, я бы пришёл.",
    correct: ["If", "I", "had", "known", "I", "would", "have", "come"],
    bank: ["If", "I", "had", "known", "I", "would", "have", "come", "knew", "will"],
    subject: "I",
    whyOk: "Верно! Нереальное прошлое → <b>if + had done, would have done</b>.",
    bridge:
      "Third Conditional — про то, чего НЕ случилось в прошлом («если бы тогда…»). Условие: <b>if + had + 3-я форма</b>; результат: <b>would have + 3-я форма</b>. <b>If I had known, I would have come</b>.",
    rule: "<b>if + had + V3, … would have + V3</b>. Нереальное прошлое.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: if + <b>had known</b>, главная → <b>would have come</b>.",
        bridge:
          "Схема: <b>If + had + V3, would have + V3</b>. had known → would have come. <b>If I had known, I would have come</b>.",
        rule: "if + had + V3 → would have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If I had known, I would have come</i> — несбывшееся прошлое.",
        bridge:
          "Сравни: <i>If I <b>knew</b>, I <b>would</b> come</i> (сейчас/вообще) ↔ <i>If I <b>had known</b>, I <b>would have</b> come</i> (тогда, в прошлом).",
        rule: "«Если бы тогда» → had + V3 / would have + V3.",
      },
    },
  },
  {
    topic: "third-conditional",
    kind: "third-conditional",
    ru: "Если бы ты спросил, я бы помог.",
    correct: ["If", "you", "had", "asked", "I", "would", "have", "helped"],
    bank: ["If", "you", "had", "asked", "I", "would", "have", "helped", "asked", "will"],
    subject: "you",
    whyOk: "Верно! <b>had asked</b> + <b>would have helped</b> — упущенное прошлое.",
    bridge:
      "Ты не спросил — поэтому я не помог. Это Third Conditional: <b>if + had asked, would have helped</b>.",
    rule: "<b>if + had + V3, would have + V3</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had asked → would have helped.",
        bridge:
          "if + had + asked (V3), главная → would have + helped (V3). <b>If you had asked, I would have helped</b>.",
        rule: "had + V3 → would have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If you had asked, I would have helped</i>, <i>If they had called, we would have known</i>.",
        bridge:
          "Образец: <i>If she <b>had studied</b>, she <b>would have passed</b></i>. Не сделал → не случилось.",
        rule: "Упущенная возможность → had V3 / would have V3.",
      },
    },
  },
  {
    topic: "third-conditional",
    kind: "third-conditional",
    ru: "Мы бы выиграли, если бы тренировались.",
    correct: ["We", "would", "have", "won", "if", "we", "had", "trained"],
    bank: ["We", "would", "have", "won", "if", "we", "had", "trained", "win", "will"],
    subject: "We",
    whyOk: "Верно! Главная часть может идти первой: <b>would have won … if … had trained</b>.",
    bridge:
      "Порядок частей свободный. Главная с <b>would have won</b>, условие с <b>had trained</b>. Запятая тогда не нужна. <b>We would have won if we had trained</b>.",
    rule: "Можно: <b>would have + V3 … if + had + V3</b> (порядок свободный).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: would have won + if had trained.",
        bridge:
          "Результат впереди: <b>would have won</b> + <b>if we had trained</b>. Оба глагола в перфектной форме прошлого.",
        rule: "would have V3 + if + had V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>We would have won if we had trained</i> — результат может быть первым.",
        bridge:
          "Образец: <i>I <b>would have called</b> if I <b>had had</b> your number</i>. Условие может стоять после.",
        rule: "Главная (would have) + if (had).",
      },
    },
  },
];

// ── Mixed Conditionals: прошлое условие → настоящий результат ────────────────
export const MIXED_CONDITIONALS: LessonItem[] = [
  {
    topic: "mixed-conditionals",
    kind: "mixed-conditionals",
    ru: "Если бы я учился, я был бы богат сейчас.",
    correct: ["If", "I", "had", "studied", "I", "would", "be", "rich", "now"],
    bank: ["If", "I", "had", "studied", "I", "would", "be", "rich", "now", "studied", "have"],
    subject: "I",
    whyOk: "Верно! Прошлое условие → настоящий результат: <b>had studied</b> + <b>would be</b>.",
    bridge:
      "Смешанное условие: причина в ПРОШЛОМ (<b>had studied</b>), а результат в НАСТОЯЩЕМ (<b>would be rich now</b>). Маркер <b>now</b> подсказывает: результат сейчас, не «would have been».",
    rule: "<b>if + had + V3, … would + V</b> (прошлое → настоящее). Сигнал: now.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had studied (прошлое) → would be (настоящее).",
        bridge:
          "Условие прошлое: <b>had + V3</b>. Результат настоящий: <b>would + база</b> (would be), не would have been. <b>If I had studied, I would be rich now</b>.",
        rule: "if + had V3 → would + V (now).",
      },
      "examples-first": {
        whyOk: "Верно! <i>If I had studied, I would be rich now</i> — прошлая причина, нынешний итог.",
        bridge:
          "Сравни: <i>…I would <b>have been</b> rich</i> (итог в прошлом) ↔ <i>…I would <b>be</b> rich <b>now</b></i> (итог сейчас).",
        rule: "Прошлая причина + «now» → would + V.",
      },
    },
  },
  {
    topic: "mixed-conditionals",
    kind: "mixed-conditionals",
    ru: "Если бы она не опоздала, она была бы здесь.",
    correct: ["If", "she", "hadn't", "been", "late", "she", "would", "be", "here"],
    bank: ["If", "she", "hadn't", "been", "late", "she", "would", "be", "here", "wasn't", "have"],
    subject: "she",
    whyOk: "Верно! Прошлое условие (<b>hadn't been</b>) → настоящий результат (<b>would be here</b>).",
    bridge:
      "Опоздала в прошлом → её нет здесь сейчас. Условие: <b>if + hadn't + V3</b>; результат сейчас: <b>would be here</b>.",
    rule: "<b>if + hadn't + V3, … would + V</b> (прошлая причина → нынешнее следствие).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: hadn't been → would be.",
        bridge:
          "Отрицание прошлого условия: <b>hadn't been late</b>. Результат настоящий: <b>would be here</b>. <b>If she hadn't been late, she would be here</b>.",
        rule: "if + hadn't V3 → would + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If she hadn't been late, she would be here</i> — прошлое → сейчас.",
        bridge:
          "Образец: <i>If I <b>hadn't missed</b> the train, I <b>would be</b> home now</i>. Прошлая ошибка → нынешний результат.",
        rule: "Прошлая причина → нынешний результат.",
      },
    },
  },
  {
    topic: "mixed-conditionals",
    kind: "mixed-conditionals",
    ru: "Если бы я взял зонт, я не был бы мокрым.",
    correct: ["If", "I", "had", "taken", "an", "umbrella", "I", "wouldn't", "be", "wet"],
    bank: ["If", "I", "had", "taken", "an", "umbrella", "I", "wouldn't", "be", "wet", "took"],
    subject: "I",
    whyOk: "Верно! <b>had taken</b> (прошлое) → <b>wouldn't be wet</b> (сейчас).",
    bridge:
      "Не взял зонт в прошлом → мокрый сейчас. Прошлое условие <b>had taken</b>, нынешний результат <b>wouldn't be wet</b>.",
    rule: "<b>if + had + V3, … wouldn't + V</b> (прошлое → настоящее, отрицание).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had taken → wouldn't be.",
        bridge:
          "Условие прошлое: had taken. Результат сейчас отрицательный: wouldn't be wet. <b>If I had taken an umbrella, I wouldn't be wet</b>.",
        rule: "if + had V3 → wouldn't + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If I had taken an umbrella, I wouldn't be wet</i> — прошлое решение, нынешнее состояние.",
        bridge:
          "Образец: <i>If I <b>had set</b> an alarm, I <b>wouldn't be</b> late now</i>. Прошлый промах → сейчас.",
        rule: "Прошлый промах → нынешнее «wouldn't be».",
      },
    },
  },
];

// ── I wish (о прошлом): сожаление had done ──────────────────────────────────
export const WISH_PAST_PERFECT: LessonItem[] = [
  {
    topic: "wish-past-perfect",
    kind: "wish-past-perfect",
    ru: "Жаль, что я не учился усерднее.",
    correct: ["I", "wish", "I", "had", "studied", "harder"],
    bank: ["I", "wish", "I", "had", "studied", "harder", "studied", "would"],
    subject: "I",
    whyOk: "Верно! Сожаление о ПРОШЛОМ → <b>wish + had + V3</b>: <b>wish I had studied</b>.",
    bridge:
      "Когда жалеешь о том, что было (или не было) в прошлом — <b>wish + had + 3-я форма</b>: <b>I wish I had studied harder</b> (= жаль, что не учился усерднее).",
    rule: "Сожаление о прошлом: <b>wish + had + V3</b>. (О настоящем — wish + past.)",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: wish + <b>had studied</b> (V3).",
        bridge:
          "Сожаление о прошлом → after wish ставим <b>had + V3</b>. <b>I wish I had studied harder</b>.",
        rule: "wish + had + V3 (прошлое).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I wish I had studied</i>, <i>I wish I had known</i> — сожаление о прошлом.",
        bridge:
          "Сравни: <i>I wish I <b>knew</b></i> (жаль, не знаю сейчас) ↔ <i>I wish I <b>had known</b></i> (жаль, не знал тогда).",
        rule: "«Жаль, что тогда…» → wish + had + V3.",
      },
    },
  },
  {
    topic: "wish-past-perfect",
    kind: "wish-past-perfect",
    ru: "Жаль, что я тебе не сказал.",
    correct: ["I", "wish", "I", "had", "told", "you"],
    bank: ["I", "wish", "I", "had", "told", "you", "told", "would"],
    subject: "I",
    whyOk: "Верно! «Жаль, что не сказал» → <b>wish I had told you</b>.",
    bridge:
      "Сожаление о несделанном в прошлом: <b>wish + had + V3</b>. tell → told (3-я форма). <b>I wish I had told you</b>.",
    rule: "<b>wish + had + V3</b> — жаль о действии в прошлом.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: wish + had told.",
        bridge:
          "had + told (3-я форма tell). <b>I wish I had told you</b>.",
        rule: "wish + had + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I wish I had told you</i>, <i>I wish I had asked</i>.",
        bridge:
          "Образец: <i>I wish I <b>had said</b> sorry</i>. Сожаление о прошлом поступке.",
        rule: "«Жаль, что не сделал» → wish + had + V3.",
      },
    },
  },
  {
    topic: "wish-past-perfect",
    kind: "wish-past-perfect",
    ru: "Жаль, что мы не пошли.",
    correct: ["I", "wish", "we", "had", "gone"],
    bank: ["I", "wish", "we", "had", "gone", "went", "would"],
    subject: "we",
    whyOk: "Верно! go → <b>gone</b> (3-я форма) после <b>wish … had</b>.",
    bridge:
      "«Жаль, что не пошли» → <b>wish + had + gone</b> (go — неправильный: gone). <b>I wish we had gone</b>.",
    rule: "<b>wish + had + V3</b>; go → gone (исключение).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: wish we <b>had gone</b>.",
        bridge:
          "had + gone (3-я форма go). <b>I wish we had gone</b>.",
        rule: "wish + had + V3 (gone).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I wish we had gone</i>, <i>I wish I had seen it</i>.",
        bridge:
          "Образец: <i>I wish we <b>had stayed</b> longer</i>. Сожаление о прошлом выборе.",
        rule: "Сожаление о прошлом → wish + had + V3.",
      },
    },
  },
];
