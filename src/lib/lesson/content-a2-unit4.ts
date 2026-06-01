// Контент A2 · Юнит 4 «Опыт и советы» (кураторский, см. content.ts).
// Темы: present-perfect, perfect-vs-past, modals-advice, adverbs-manner.

import type { LessonItem } from "./items";

// ── Present Perfect: have done ──────────────────────────────────────────────
export const PRESENT_PERFECT: LessonItem[] = [
  {
    topic: "present-perfect",
    kind: "present-perfect",
    ru: "Я уже сделал это.",
    correct: ["I", "have", "done", "it"],
    bank: ["I", "have", "done", "it", "did", "has"],
    subject: "I",
    whyOk: "Верно! Результат к настоящему → <b>have + 3-я форма</b>: <b>have done</b>.",
    bridge:
      "Present Perfect = «сделал и есть результат сейчас». Строится <b>have/has + третья форма глагола</b>: do → done. <b>I have done it</b>.",
    rule: "<b>have/has + V3</b> (третья форма). I have done, she has gone.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: have + <b>done</b> (V3).",
        bridge:
          "Формула: <b>have + третья форма</b>. do → done. <b>I have done it</b>.",
        rule: "<b>have + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>have done</i>, <i>have seen</i>, <i>have finished</i> — have + V3.",
        bridge:
          "Ряд: <i>I have <b>done</b></i> · <i>I have <b>made</b></i>. Результат → have + третья форма.",
        rule: "Результат → <b>have + V3</b>.",
      },
    },
  },
  {
    topic: "present-perfect",
    kind: "present-perfect",
    ru: "Она потеряла ключи.",
    correct: ["She", "has", "lost", "her", "keys"],
    bank: ["She", "has", "lost", "her", "keys", "have", "lose"],
    subject: "She",
    whyOk: "Верно! С <b>she</b> → <b>has</b> + 3-я форма: <b>has lost</b>.",
    bridge:
      "Для he/she/it вспомогательный — <b>has</b> (не have). lose → lost (третья форма). <b>She has lost her keys</b> (и сейчас их нет).",
    rule: "<b>he/she/it → has + V3</b>. she has lost, he has gone.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → <b>has lost</b>.",
        bridge:
          "she → has. lose → lost. <b>She has lost her keys</b>.",
        rule: "she/he/it → <b>has + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>she has lost</i>, <i>he has done</i>, <i>it has stopped</i>.",
        bridge:
          "Сравни: <i>I <b>have</b> lost</i> ↔ <i>she <b>has</b> lost</i>. Третье лицо → has.",
        rule: "Третье лицо → <b>has</b>.",
      },
    },
  },
  {
    topic: "present-perfect",
    kind: "present-perfect",
    ru: "Ты когда-нибудь был в Лондоне?",
    correct: ["Have", "you", "ever", "been", "to", "London"],
    bank: ["Have", "you", "ever", "been", "to", "London", "did", "was"],
    subject: "you",
    whyOk: "Верно! Опыт «когда-нибудь» → <b>Have you ever been</b>.",
    bridge:
      "Для вопроса об опыте жизни — Present Perfect с <b>ever</b>: <b>Have you ever been to…?</b>. be → been (третья форма). Порядок: Have + кто + ever + been.",
    rule: "Опыт: <b>Have you ever + V3?</b> Have you ever been/seen/tried?",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Have + you + ever + <b>been</b>.",
        bridge:
          "Вопрос Perfect: <b>Have + подлежащее + (ever) + V3</b>. <b>Have you ever been to London?</b>",
        rule: "<b>Have you ever + V3?</b>",
      },
      "examples-first": {
        whyOk: "Верно! <i>Have you ever been</i>, <i>Have you ever tried</i> — опыт.",
        bridge:
          "Ряд: <i>Have you ever <b>seen</b>…?</i> · <i>Have you ever <b>eaten</b>…?</i>. Опыт → Have you ever + V3.",
        rule: "«Когда-нибудь?» → Have you ever + V3.",
      },
    },
  },
];

// ── Perfect vs Past: have been vs was ───────────────────────────────────────
export const PERFECT_VS_PAST: LessonItem[] = [
  {
    topic: "perfect-vs-past",
    kind: "perfect-vs-past",
    ru: "Я знаю её много лет.",
    correct: ["I", "have", "known", "her", "for", "years"],
    bank: ["I", "have", "known", "her", "for", "years", "knew", "know"],
    subject: "I",
    whyOk: "Верно! Действие тянется до сейчас → Present Perfect: <b>have known</b>.",
    bridge:
      "Когда «начал в прошлом и продолжается сейчас» (знаю до сих пор) — Present Perfect: <b>have known … for years</b>. Past Simple (knew) тут не подходит — он про законченное.",
    rule: "Тянется до настоящего → <b>have/has + V3</b> (часто с for/since).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: продолжается → <b>have known</b>.",
        bridge:
          "Связь с настоящим (всё ещё знаю) → Perfect: <b>have known</b> + for years. <b>I have known her for years</b>.",
        rule: "Длится до сейчас → have + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>have known for years</i>, <i>have lived here for…</i> — тянется до сейчас.",
        bridge:
          "Сравни: <i>I <b>knew</b> her</i> (раньше, закончено) ↔ <i>I <b>have known</b> her for years</i> (до сих пор).",
        rule: "До сих пор → have + V3.",
      },
    },
  },
  {
    topic: "perfect-vs-past",
    kind: "perfect-vs-past",
    ru: "Вчера я посмотрел фильм.",
    correct: ["I", "watched", "a", "film", "yesterday"],
    bank: ["I", "watched", "a", "film", "yesterday", "have", "watched"],
    subject: "I",
    whyOk: "Верно! Есть точное «вчера» → Past Simple: <b>watched</b> (не have watched).",
    bridge:
      "Если указано законченное время (yesterday, last week) — нужен Past Simple, не Perfect: <b>I watched … yesterday</b>. Perfect не дружит с «yesterday».",
    rule: "Точное прошлое время (yesterday) → <b>Past Simple</b>, не Perfect.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: yesterday → <b>watched</b> (Past Simple).",
        bridge:
          "Маркер законченного времени <b>yesterday</b> → Past Simple. <b>I watched a film yesterday</b>.",
        rule: "yesterday/last… → Past Simple.",
      },
      "examples-first": {
        whyOk: "Верно! <i>watched yesterday</i>, <i>went last week</i> — точное время → past.",
        bridge:
          "Сравни: <i>I <b>have seen</b> it</i> (когда — неважно) ↔ <i>I <b>saw</b> it yesterday</i> (точное время).",
        rule: "Названо время → past simple.",
      },
    },
  },
  {
    topic: "perfect-vs-past",
    kind: "perfect-vs-past",
    ru: "Я никогда не был в Париже.",
    correct: ["I", "have", "never", "been", "to", "Paris"],
    bank: ["I", "have", "never", "been", "to", "Paris", "was", "went"],
    subject: "I",
    whyOk: "Верно! Опыт за всю жизнь («никогда») → Perfect: <b>have never been</b>.",
    bridge:
      "«Никогда (за всю жизнь)» — это опыт до настоящего → Present Perfect с <b>never</b>: <b>have never been</b>. been — третья форма be.",
    rule: "Опыт жизни: <b>have never + V3</b>. have never been/tried/seen.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: have + never + <b>been</b>.",
        bridge:
          "Опыт «никогда» → <b>have never + V3</b>. <b>I have never been to Paris</b>.",
        rule: "have never + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>have never been</i>, <i>have never tried</i> — опыт жизни.",
        bridge:
          "Сравни: <i>I <b>wasn't</b> there yesterday</i> (конкретно) ↔ <i>I <b>have never been</b></i> (вообще).",
        rule: "«Никогда вообще» → have never + V3.",
      },
    },
  },
];

// ── should / must: советы и долженствование ─────────────────────────────────
export const MODALS_ADVICE: LessonItem[] = [
  {
    topic: "modals-advice",
    kind: "modals-advice",
    ru: "Тебе следует отдохнуть.",
    correct: ["You", "should", "rest"],
    bank: ["You", "should", "rest", "must", "shoulds"],
    subject: "You",
    whyOk: "Верно! Совет («следует») → <b>should</b> + глагол: <b>You should rest</b>.",
    bridge:
      "<b>should</b> — мягкий совет («тебе бы стоило»). После него глагол простой: <b>should rest</b>. Одинаково для всех лиц.",
    rule: "<b>should + V</b> — совет. Для всех лиц без изменений.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>should</b> + rest.",
        bridge:
          "Совет → <b>should</b> + простой глагол. <b>You should rest</b>.",
        rule: "<b>should + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>should rest</i>, <i>should try</i>, <i>should go</i> — совет.",
        bridge:
          "Ряд: <i>you <b>should</b> sleep</i> · <i>you <b>should</b> ask</i>. Совет → should.",
        rule: "Совет → <b>should</b>.",
      },
    },
  },
  {
    topic: "modals-advice",
    kind: "modals-advice",
    ru: "Ты должен идти.",
    correct: ["You", "must", "go"],
    bank: ["You", "must", "go", "should", "musts"],
    subject: "You",
    whyOk: "Верно! Сильная необходимость («должен») → <b>must</b>: <b>You must go</b>.",
    bridge:
      "<b>must</b> — сильнее should: «обязан, должен». После must глагол простой: <b>must go</b>. <b>You must go</b>.",
    rule: "<b>must + V</b> — обязанность/необходимость (сильнее should).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>must</b> + go.",
        bridge:
          "Необходимость → <b>must</b> + глагол. <b>You must go</b>.",
        rule: "<b>must + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>must go</i>, <i>must stop</i>, <i>must wait</i> — обязан.",
        bridge:
          "Сравни: <i>you <b>should</b> go</i> (совет) ↔ <i>you <b>must</b> go</i> (обязан).",
        rule: "Обязан → <b>must</b>.",
      },
    },
  },
  {
    topic: "modals-advice",
    kind: "modals-advice",
    ru: "Тебе не следует курить.",
    correct: ["You", "shouldn't", "smoke"],
    bank: ["You", "shouldn't", "smoke", "should", "must"],
    subject: "You",
    whyOk: "Верно! Отрицательный совет → <b>shouldn't</b> + глагол: <b>You shouldn't smoke</b>.",
    bridge:
      "«Не следует» = <b>shouldn't</b> (should not). Глагол после — простой: <b>shouldn't smoke</b>.",
    rule: "<b>shouldn't + V</b> — «не следует». shouldn't = should not.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>shouldn't</b> + smoke.",
        bridge:
          "Отрицание should → <b>shouldn't</b> + глагол. <b>You shouldn't smoke</b>.",
        rule: "<b>shouldn't + V</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>shouldn't smoke</i>, <i>shouldn't worry</i> — не следует.",
        bridge:
          "Сравни: <i>you <b>should</b> rest</i> ↔ <i>you <b>shouldn't</b> smoke</i>.",
        rule: "«Не следует» → <b>shouldn't</b>.",
      },
    },
  },
];

// ── Наречия образа действия (quickly, well, hard) ───────────────────────────
export const ADVERBS_MANNER: LessonItem[] = [
  {
    topic: "adverbs-manner",
    kind: "adverbs-manner",
    ru: "Она быстро бегает.",
    correct: ["She", "runs", "quickly"],
    bank: ["She", "runs", "quickly", "quick", "quicklier"],
    subject: "She",
    whyOk: "Верно! Как делает → наречие на <b>-ly</b>: quick → <b>quickly</b>.",
    bridge:
      "Наречие образа действия («как?») образуется от прилагательного окончанием <b>-ly</b>: quick → <b>quickly</b>. Описывает глагол: runs quickly.",
    rule: "Наречие = прилагательное + <b>-ly</b>. slow→slowly, quick→quickly.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: quick + <b>-ly</b> = quickly.",
        bridge:
          "Как делает → прил + <b>ly</b>. quick → quickly. <b>She runs quickly</b>.",
        rule: "+<b>ly</b> → наречие.",
      },
      "examples-first": {
        whyOk: "Верно! <i>quickly</i>, <i>slowly</i>, <i>carefully</i> — наречия на -ly.",
        bridge:
          "Ряд: <i>quick → <b>quickly</b></i> · <i>bad → <b>badly</b></i>. «Как» → -ly.",
        rule: "«Как делает» → -ly.",
      },
    },
  },
  {
    topic: "adverbs-manner",
    kind: "adverbs-manner",
    ru: "Он хорошо говорит по-английски.",
    correct: ["He", "speaks", "English", "well"],
    bank: ["He", "speaks", "English", "well", "good", "goodly"],
    subject: "He",
    whyOk: "Верно! «Хорошо» — особое наречие <b>well</b> (не goodly).",
    bridge:
      "good — прилагательное («хороший»), а наречие «хорошо» — исключение <b>well</b> (не «goodly»). «Говорит хорошо» = speaks <b>well</b>.",
    rule: "Исключение: good (прил.) → <b>well</b> (наречие).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: наречие → <b>well</b>.",
        bridge:
          "«Хорошо» (как?) → <b>well</b>, не goodly. <b>He speaks English well</b>.",
        rule: "good → наречие <b>well</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>speaks well</i>, <i>plays well</i>, <i>sleeps well</i> — well.",
        bridge:
          "Сравни: <i>a <b>good</b> singer</i> (прил.) ↔ <i>sings <b>well</b></i> (наречие).",
        rule: "«Хорошо» → <b>well</b>.",
      },
    },
  },
  {
    topic: "adverbs-manner",
    kind: "adverbs-manner",
    ru: "Они усердно работают.",
    correct: ["They", "work", "hard"],
    bank: ["They", "work", "hard", "hardly", "hardly"],
    subject: "They",
    whyOk: "Верно! «Усердно» → <b>hard</b> (не hardly — это «едва»!).",
    bridge:
      "Хитрость: наречие «усердно» — это <b>hard</b> (форма та же, что у прилагательного). А <b>hardly</b> значит совсем другое — «едва, почти не». <b>They work hard</b>.",
    rule: "<b>hard</b> = усердно; <b>hardly</b> = едва (ложный друг!).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: усердно → <b>hard</b>.",
        bridge:
          "«Усердно» → <b>hard</b> (без -ly). hardly = «едва», не подходит. <b>They work hard</b>.",
        rule: "Усердно → <b>hard</b> (не hardly).",
      },
      "examples-first": {
        whyOk: "Верно! <i>work hard</i>, <i>try hard</i>, <i>study hard</i> — усердно.",
        bridge:
          "Сравни: <i>work <b>hard</b></i> (усердно) ↔ <i><b>hardly</b> work</i> (почти не работают). Разный смысл!",
        rule: "Усердно → <b>hard</b>.",
      },
    },
  },
];
