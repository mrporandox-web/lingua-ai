// Контент A2 · Юнит 2 «Будущее и планы» (кураторский, см. content.ts).
// Темы: future-will, going-to, future-time, predictions.
// Формат sentence-builder; каждый айтем проходит validateLessonItem.

import type { LessonItem } from "./items";

// ── Future will: решения и обещания ─────────────────────────────────────────
export const FUTURE_WILL: LessonItem[] = [
  {
    topic: "future-will",
    kind: "future-will",
    ru: "Я помогу тебе.",
    correct: ["I", "will", "help", "you"],
    bank: ["I", "will", "help", "you", "wills", "helps"],
    subject: "I",
    whyOk: "Верно! Обещание/решение → <b>will + глагол</b>: <b>I will help you</b>.",
    bridge:
      "<b>will</b> — для решений и обещаний, принятых в момент речи. После него глагол простой: <b>will help</b> (не «will helps»). Одинаково для всех лиц.",
    rule: "<b>will + V</b> (база). Решения/обещания. will для I/you/he/we — без изменений.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>will</b> + help.",
        bridge:
          "Формула будущего-обещания: <b>подлежащее + will + глагол</b>. I + will + help. <b>I will help you</b>.",
        rule: "<b>will + V</b> (для всех лиц).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I will help</i>, <i>I will call</i>, <i>I will come</i> — will + простой глагол.",
        bridge:
          "Ряд: <i>I <b>will</b> help</i> · <i>she <b>will</b> wait</i>. will не меняется по лицам.",
        rule: "Обещание → <b>will</b> + глагол.",
      },
    },
  },
  {
    topic: "future-will",
    kind: "future-will",
    ru: "Она позвонит позже.",
    correct: ["She", "will", "call", "later"],
    bank: ["She", "will", "call", "later", "calls", "wills"],
    subject: "She",
    whyOk: "Верно! С <b>she</b> тоже <b>will call</b> (will без -s, глагол без -s).",
    bridge:
      "Модальный <b>will</b> не берёт -s даже для she, и глагол после — простой: <b>will call</b> (не «will calls»).",
    rule: "<b>will</b> одинаков для всех лиц: she will call, he will go.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → <b>will call</b>.",
        bridge:
          "Для любого лица будущее с will строится одинаково: <b>will + глагол</b>. <b>She will call later</b>.",
        rule: "she/he/it → <b>will + V</b> (без -s).",
      },
      "examples-first": {
        whyOk: "Верно! <i>she will call</i>, <i>he will help</i> — форма одна.",
        bridge:
          "Сравни настоящее и будущее: <i>she call<b>s</b></i> (сейчас) ↔ <i>she <b>will call</b></i> (потом). С will -s не нужен.",
        rule: "Будущее с will → без -s.",
      },
    },
  },
  {
    topic: "future-will",
    kind: "future-will",
    ru: "Мы не опоздаем.",
    correct: ["We", "won't", "be", "late"],
    bank: ["We", "won't", "be", "late", "will", "not"],
    subject: "We",
    whyOk: "Верно! Отрицание будущего → <b>won't</b> (= will not): <b>We won't be late</b>.",
    bridge:
      "«Не будем» = <b>won't</b> (короткое от will not). Дальше глагол простой: <b>won't be</b>. <b>We won't be late</b>.",
    rule: "<b>won't</b> = will not. won't + глагол.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>won't</b> + be.",
        bridge:
          "Отрицание will → <b>won't</b>. Глагол база → be. <b>We won't be late</b>.",
        rule: "<b>won't</b> + V (отрицание будущего).",
      },
      "examples-first": {
        whyOk: "Верно! <i>won't be</i>, <i>won't come</i>, <i>won't forget</i> — won't + глагол.",
        bridge:
          "Сравни: <i>we <b>will</b> be</i> ↔ <i>we <b>won't</b> be</i>. won't = «не будем».",
        rule: "«Не будет» → <b>won't</b> + V.",
      },
    },
  },
];

// ── be going to: планы и намерения ──────────────────────────────────────────
export const GOING_TO: LessonItem[] = [
  {
    topic: "going-to",
    kind: "going-to",
    ru: "Я собираюсь учиться.",
    correct: ["I", "am", "going", "to", "study"],
    bank: ["I", "am", "going", "to", "study", "is", "studies"],
    subject: "I",
    whyOk: "Верно! Заранее запланированное → <b>be going to + глагол</b>: <b>am going to study</b>.",
    bridge:
      "<b>be going to</b> — про планы, решённые ЗАРАНЕЕ (в отличие от will — решений на ходу). Для I → <b>am going to</b> + простой глагол: <b>I am going to study</b>.",
    rule: "<b>am/is/are + going to + V</b>. Планы и намерения.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: I → <b>am going to</b> + study.",
        bridge:
          "Формула: <b>be (am/is/are) + going to + глагол</b>. I → am. <b>I am going to study</b>.",
        rule: "<b>be + going to + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I am going to study</i>, <i>I am going to travel</i> — план через going to.",
        bridge:
          "Сравни: <i>I <b>will</b> help</i> (решил сейчас) ↔ <i>I <b>am going to</b> study</i> (планировал заранее).",
        rule: "Заранее решённый план → <b>going to</b>.",
      },
    },
  },
  {
    topic: "going-to",
    kind: "going-to",
    ru: "Они собираются переехать.",
    correct: ["They", "are", "going", "to", "move"],
    bank: ["They", "are", "going", "to", "move", "is", "moving"],
    subject: "They",
    whyOk: "Верно! С <b>they</b> → <b>are going to</b> + move.",
    bridge:
      "Выбор be по лицу: они → <b>are</b>. Дальше <b>going to + глагол</b>: <b>are going to move</b>.",
    rule: "<b>we/you/they → are going to</b> + V.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: they → <b>are going to</b> move.",
        bridge:
          "they → be = are. <b>are going to move</b>. <b>They are going to move</b>.",
        rule: "they → <b>are going to + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>they are going to move</i>, <i>we are going to start</i>.",
        bridge:
          "Ряд: <i>I <b>am</b> going to</i> · <i>she <b>is</b> going to</i> · <i>they <b>are</b> going to</i>. Меняется только be.",
        rule: "be по лицу + <b>going to + V</b>.",
      },
    },
  },
  {
    topic: "going-to",
    kind: "going-to",
    ru: "Она собирается купить машину.",
    correct: ["She", "is", "going", "to", "buy", "a", "car"],
    bank: ["She", "is", "going", "to", "buy", "a", "car", "are", "buys"],
    subject: "She",
    whyOk: "Верно! С <b>she</b> → <b>is going to</b> + buy.",
    bridge:
      "Третье лицо she → be = <b>is</b>. Дальше <b>going to buy</b> (глагол простой). <b>She is going to buy a car</b>.",
    rule: "<b>he/she/it → is going to</b> + V.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → <b>is going to</b> buy.",
        bridge:
          "she → is. <b>is going to + buy</b>. <b>She is going to buy a car</b>.",
        rule: "she → <b>is going to + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>she is going to buy</i>, <i>he is going to call</i>.",
        bridge:
          "Сравни: <i>they <b>are</b> going to</i> ↔ <i>she <b>is</b> going to</i>. Третье лицо → is.",
        rule: "Третье лицо → <b>is going to</b>.",
      },
    },
  },
];

// ── Future time clauses: when/if + present ──────────────────────────────────
export const FUTURE_TIME: LessonItem[] = [
  {
    topic: "future-time",
    kind: "future-time",
    ru: "Если пойдёт дождь, мы останемся дома.",
    correct: ["If", "it", "rains", "we", "will", "stay", "home"],
    bank: ["If", "it", "rains", "we", "will", "stay", "home", "will", "rain"],
    subject: "it",
    whyOk: "Верно! После <b>if</b> — настоящее (<b>rains</b>), в главной части — <b>will</b>.",
    bridge:
      "Важное правило: после <b>if/when</b> о будущем ставят НАСТОЯЩЕЕ время (<b>rains</b>), хотя по-русски там будущее («пойдёт»). Будущее (<b>will stay</b>) — только в главной части.",
    rule: "После <b>if/when</b> → present; в главной части → <b>will</b>. (If it rains, we will stay.)",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: if + <b>rains</b> (present), главная → <b>will stay</b>.",
        bridge:
          "Схема: <b>If + present, … will + V</b>. После if — rains (не will rain). Главная — will stay. <b>If it rains, we will stay home</b>.",
        rule: "if/when + present; will — в главной.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If it rains, we will stay</i>, <i>When I come, I will call</i> — после if/when present.",
        bridge:
          "Образец: <i>If you <b>ask</b>, I <b>will help</b></i>. В условии — present, в результате — will.",
        rule: "Условие → present, результат → will.",
      },
    },
  },
  {
    topic: "future-time",
    kind: "future-time",
    ru: "Когда он придёт, мы поедим.",
    correct: ["When", "he", "comes", "we", "will", "eat"],
    bank: ["When", "he", "comes", "we", "will", "eat", "will", "come"],
    subject: "he",
    whyOk: "Верно! После <b>when</b> — настоящее (<b>comes</b>), главная — <b>will eat</b>.",
    bridge:
      "То же правило с <b>when</b>: «когда придёт» → present <b>comes</b> (не «will come»). Будущее — только в главной части: <b>will eat</b>.",
    rule: "<b>when + present</b>, главная часть → <b>will</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: when + <b>comes</b>, главная → <b>will eat</b>.",
        bridge:
          "Схема: <b>When + present, … will + V</b>. when he comes (present) + we will eat. <b>When he comes, we will eat</b>.",
        rule: "when + present; will — в главной.",
      },
      "examples-first": {
        whyOk: "Верно! <i>When he comes, we will eat</i>, <i>When it stops, we will go</i>.",
        bridge:
          "Образец: <i>When you <b>finish</b>, you <b>will feel</b> better</i>. После when — present.",
        rule: "when → present, потом will.",
      },
    },
  },
  {
    topic: "future-time",
    kind: "future-time",
    ru: "Когда я закончу, я отдохну.",
    correct: ["When", "I", "finish", "I", "will", "rest"],
    bank: ["When", "I", "finish", "I", "will", "rest", "will", "finished"],
    subject: "I",
    whyOk: "Верно! «Когда закончу» → present <b>finish</b>, главная → <b>will rest</b>.",
    bridge:
      "Даже когда оба действия в будущем, после <b>when</b> используют present (<b>finish</b>), а <b>will</b> ставят только в главную часть (<b>will rest</b>).",
    rule: "<b>when I finish</b> (present), <b>I will rest</b> (will).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: when + <b>finish</b>, главная <b>will rest</b>.",
        bridge:
          "<b>When + present, … will</b>. when I finish + I will rest. <b>When I finish, I will rest</b>.",
        rule: "when + present, will в главной.",
      },
      "examples-first": {
        whyOk: "Верно! <i>When I finish, I will rest</i> — present после when, will в результате.",
        bridge:
          "Образец: <i>When I <b>get</b> home, I <b>will call</b></i>. После when — present.",
        rule: "when → present, главная → will.",
      },
    },
  },
];

// ── Predictions: will / might про будущее ───────────────────────────────────
export const PREDICTIONS: LessonItem[] = [
  {
    topic: "predictions",
    kind: "predictions",
    ru: "Завтра будет дождь.",
    correct: ["It", "will", "rain", "tomorrow"],
    bank: ["It", "will", "rain", "tomorrow", "rains", "is"],
    subject: "It",
    whyOk: "Верно! Прогноз с уверенностью → <b>will</b>: <b>It will rain tomorrow</b>.",
    bridge:
      "Для прогнозов о будущем (что случится) используют <b>will</b>: <b>It will rain</b>. Безличное «оно» → <b>It</b>.",
    rule: "Прогноз → <b>will + V</b>. It will rain, prices will rise.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>It will rain</b>.",
        bridge:
          "Предсказание → It + <b>will</b> + глагол. <b>It will rain tomorrow</b>.",
        rule: "Прогноз → <b>will</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>It will rain</i>, <i>It will be cold</i> — прогнозы через will.",
        bridge:
          "Ряд: <i>It <b>will</b> snow</i> · <i>They <b>will</b> win</i>. Уверенный прогноз → will.",
        rule: "Уверен → <b>will</b>.",
      },
    },
  },
  {
    topic: "predictions",
    kind: "predictions",
    ru: "Возможно, она опоздает.",
    correct: ["She", "might", "be", "late"],
    bank: ["She", "might", "be", "late", "will", "mights"],
    subject: "She",
    whyOk: "Верно! Неуверенный прогноз («возможно») → <b>might</b>: <b>She might be late</b>.",
    bridge:
      "Когда не уверен («возможно, может быть») — берут <b>might</b> вместо will. После might глагол простой: <b>might be</b>. <b>She might be late</b>.",
    rule: "<b>might + V</b> — «возможно». Менее уверенно, чем will.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>might</b> + be (возможность).",
        bridge:
          "Неуверенность → <b>might</b> + простой глагол. might be. <b>She might be late</b>.",
        rule: "«Возможно» → <b>might + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>might be</i>, <i>might come</i>, <i>might rain</i> — возможность.",
        bridge:
          "Сравни: <i>she <b>will</b> be late</i> (уверен) ↔ <i>she <b>might</b> be late</i> (возможно).",
        rule: "Не уверен → <b>might</b>.",
      },
    },
  },
  {
    topic: "predictions",
    kind: "predictions",
    ru: "Они, наверное, выиграют.",
    correct: ["They", "will", "probably", "win"],
    bank: ["They", "will", "probably", "win", "might", "wins"],
    subject: "They",
    whyOk: "Верно! «Наверное» → <b>will probably</b>: <b>They will probably win</b>.",
    bridge:
      "«Наверное/скорее всего» = <b>will probably</b>. Наречие <b>probably</b> ставят между will и глаголом: <b>will probably win</b>.",
    rule: "<b>will probably + V</b> — «скорее всего». probably между will и глаголом.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>will probably</b> + win.",
        bridge:
          "Порядок: <b>will + probably + глагол</b>. will probably win. <b>They will probably win</b>.",
        rule: "will + <b>probably</b> + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>will probably win</i>, <i>will probably come</i> — наверное.",
        bridge:
          "Ряд: <i>they <b>will probably</b> win</i> · <i>he <b>will probably</b> agree</i>. probably после will.",
        rule: "«Наверное» → will probably + V.",
      },
    },
  },
];
