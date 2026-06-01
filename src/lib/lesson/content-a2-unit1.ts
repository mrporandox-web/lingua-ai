// Контент A2 · Юнит 1 «Прошлое» (кураторский, см. content.ts).
// Темы: past-simple (правильные), past-irregular, past-continuous, used-to.
// Формат sentence-builder; каждый айтем проходит validateLessonItem.

import type { LessonItem } from "./items";

// ── Past Simple: правильные глаголы (-ed) ───────────────────────────────────
export const PAST_SIMPLE: LessonItem[] = [
  {
    topic: "past-simple",
    kind: "past-simple",
    ru: "Вчера я работал.",
    correct: ["I", "worked", "yesterday"],
    bank: ["I", "worked", "yesterday", "work", "worded"],
    subject: "I",
    whyOk: "Верно! Прошедшее правильного глагола → <b>-ed</b>: work → <b>worked</b>.",
    bridge:
      "В английском прошедшее у большинства глаголов образуется окончанием <b>-ed</b>: work → <b>worked</b>. Сигнал <b>yesterday</b> (вчера) — это про прошлое.",
    rule: "Past Simple (правильные): глагол + <b>-ed</b>. work→worked, play→played.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: work + <b>-ed</b> = worked.",
        bridge:
          "Формула прошедшего: <b>основа + ed</b>. work → worked. Одинаково для всех лиц. <b>I worked yesterday</b>.",
        rule: "Прошедшее правильных: <b>V + ed</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>worked</i>, <i>played</i>, <i>watched</i> — прошедшее на <b>-ed</b>.",
        bridge:
          "Ряд: <i>work → <b>worked</b></i> · <i>open → <b>opened</b></i> · <i>start → <b>started</b></i>. Прошлое → хвост <b>-ed</b>.",
        rule: "«Вчера/раньше» → глагол + <b>-ed</b>.",
      },
    },
  },
  {
    topic: "past-simple",
    kind: "past-simple",
    ru: "Она вчера смотрела фильм.",
    correct: ["She", "watched", "a", "movie", "yesterday"],
    bank: ["She", "watched", "a", "movie", "yesterday", "watch"],
    subject: "She",
    whyOk: "Верно! В прошедшем форма одна для всех лиц: <b>watched</b> (без -s).",
    bridge:
      "Приятная новость: в Past Simple глагол НЕ меняется по лицам — никаких -s для she. Просто <b>watched</b>: <b>She watched a movie</b>.",
    rule: "Past Simple одинаков для всех: I/he/she/we + <b>watched</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>watched</b> для she (без -s в прошедшем).",
        bridge:
          "В настоящем было бы «she watches», но в прошедшем -s не нужен: <b>watched</b> для всех. <b>She watched a movie</b>.",
        rule: "Прошедшее: форма одна на все лица.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I watched</i>, <i>she watched</i>, <i>they watched</i> — форма одна.",
        bridge:
          "Сравни настоящее и прошлое: <i>she watch<b>es</b></i> (сейчас) ↔ <i>she <b>watched</b></i> (вчера). В прошлом без -s.",
        rule: "Прошедшее: <b>watched</b> для любого лица.",
      },
    },
  },
  {
    topic: "past-simple",
    kind: "past-simple",
    ru: "Мы вчера играли в футбол.",
    correct: ["We", "played", "football", "yesterday"],
    bank: ["We", "played", "football", "yesterday", "play"],
    subject: "We",
    whyOk: "Верно! play → <b>played</b> (после гласной просто +ed).",
    bridge:
      "«Играли» — прошлое → <b>played</b>. Глагол play оканчивается на гласную+y, поэтому просто +ed: <b>played</b>.",
    rule: "play → played, stay → stayed. Гласная перед y → просто +ed.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: play + <b>-ed</b> = played.",
        bridge:
          "Основа play + <b>ed</b> = <b>played</b>. <b>We played football yesterday</b>.",
        rule: "play → <b>played</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>played</i>, <i>stayed</i>, <i>enjoyed</i> — +ed.",
        bridge:
          "Ряд: <i>play → <b>played</b></i> · <i>stay → <b>stayed</b></i>. Прошлое → <b>-ed</b>.",
        rule: "play/stay → +<b>ed</b>.",
      },
    },
  },
];

// ── Неправильные глаголы прошедшего ─────────────────────────────────────────
export const PAST_IRREGULAR: LessonItem[] = [
  {
    topic: "past-irregular",
    kind: "past-irregular",
    ru: "Вчера я пошёл домой.",
    correct: ["I", "went", "home", "yesterday"],
    bank: ["I", "went", "home", "yesterday", "goed", "go"],
    subject: "I",
    whyOk: "Верно! go — неправильный: прошедшее <b>went</b> (не goed).",
    bridge:
      "Часть глаголов в прошедшем меняется не по правилу -ed, а полностью: go → <b>went</b>. Такие формы заучивают. «Goed» не существует.",
    rule: "Неправильные: go→<b>went</b>, see→saw, have→had, do→did.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: go → <b>went</b> (форма-исключение).",
        bridge:
          "Сначала проверь, не исключение ли глагол. go — да, прошедшее <b>went</b> (не по -ed). <b>I went home yesterday</b>.",
        rule: "go → <b>went</b> (заучить).",
      },
      "examples-first": {
        whyOk: "Верно! <i>go → went</i>, <i>see → saw</i>, <i>eat → ate</i> — особые формы.",
        bridge:
          "Ряд исключений: <i>go → <b>went</b></i> · <i>have → <b>had</b></i> · <i>make → <b>made</b></i>. Не -ed, а своя форма.",
        rule: "Неправильные заучиваем: go → went.",
      },
    },
  },
  {
    topic: "past-irregular",
    kind: "past-irregular",
    ru: "Она увидела птицу.",
    correct: ["She", "saw", "a", "bird"],
    bank: ["She", "saw", "a", "bird", "seed", "see"],
    subject: "She",
    whyOk: "Верно! see → <b>saw</b> (неправильный глагол).",
    bridge:
      "see в прошедшем — <b>saw</b> (не «seed» и не «sawed»). Форму надо запомнить. И в прошедшем нет -s для she.",
    rule: "see → <b>saw</b>. Неправильные одинаковы для всех лиц.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: see → <b>saw</b>.",
        bridge:
          "see — исключение: прошедшее <b>saw</b>. Для she без -s. <b>She saw a bird</b>.",
        rule: "see → <b>saw</b> (для всех лиц).",
      },
      "examples-first": {
        whyOk: "Верно! <i>see → saw</i>, <i>come → came</i>, <i>give → gave</i>.",
        bridge:
          "Ряд: <i>see → <b>saw</b></i> · <i>take → <b>took</b></i>. Прошлое — особая форма.",
        rule: "see → saw; заучивай ряды.",
      },
    },
  },
  {
    topic: "past-irregular",
    kind: "past-irregular",
    ru: "У нас был хороший день.",
    correct: ["We", "had", "a", "good", "day"],
    bank: ["We", "had", "a", "good", "day", "haved", "have"],
    subject: "We",
    whyOk: "Верно! have → <b>had</b> в прошедшем.",
    bridge:
      "have (есть/иметь) в прошедшем — <b>had</b> (не «haved»). «У нас был день» = <b>We had a good day</b>.",
    rule: "have/has → <b>had</b> (прошедшее, для всех лиц).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: have → <b>had</b>.",
        bridge:
          "Прошедшее have — исключение <b>had</b>. И have, и has в прошлом → had. <b>We had a good day</b>.",
        rule: "have/has → <b>had</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>have → had</i>, <i>get → got</i>, <i>say → said</i>.",
        bridge:
          "Ряд: <i>have → <b>had</b></i> · <i>do → <b>did</b></i>. Частые глаголы — неправильные.",
        rule: "have → had.",
      },
    },
  },
];

// ── Past Continuous: was/were + -ing ────────────────────────────────────────
export const PAST_CONTINUOUS: LessonItem[] = [
  {
    topic: "past-continuous",
    kind: "past-continuous",
    ru: "Я спал в десять.",
    correct: ["I", "was", "sleeping", "at", "ten"],
    bank: ["I", "was", "sleeping", "at", "ten", "were", "sleep"],
    subject: "I",
    whyOk: "Верно! Длилось в момент в прошлом → <b>was + -ing</b>: <b>was sleeping</b>.",
    bridge:
      "Past Continuous = «был в процессе тогда-то». Строится <b>was/were + глагол-ing</b>. Для I → <b>was</b>: <b>I was sleeping at ten</b>.",
    rule: "Past Continuous: <b>was/were + V-ing</b>. I/he/she → was, we/you/they → were.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: I → <b>was</b> + sleeping.",
        bridge:
          "Формула: <b>was/were + V-ing</b>. I → was, глагол → sleeping. <b>I was sleeping at ten</b>.",
        rule: "<b>was/were + V-ing</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I was sleeping</i>, <i>he was reading</i> — was + -ing.",
        bridge:
          "Сравни: <i>I <b>am</b> sleeping</i> (сейчас) ↔ <i>I <b>was</b> sleeping</i> (тогда). Прошлый процесс → was.",
        rule: "Процесс в прошлом → <b>was/were + -ing</b>.",
      },
    },
  },
  {
    topic: "past-continuous",
    kind: "past-continuous",
    ru: "Они играли весь день.",
    correct: ["They", "were", "playing", "all", "day"],
    bank: ["They", "were", "playing", "all", "day", "was", "play"],
    subject: "They",
    whyOk: "Верно! С <b>they</b> → <b>were</b> + -ing: <b>were playing</b>.",
    bridge:
      "Для we/you/they вспомогательный в прошедшем процессе — <b>were</b> (не was). <b>They were playing all day</b>.",
    rule: "<b>we/you/they → were</b> + V-ing.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: they → <b>were</b> + playing.",
        bridge:
          "Лицо they → <b>were</b>. Глагол → playing. <b>They were playing all day</b>.",
        rule: "they → <b>were</b> + V-ing.",
      },
      "examples-first": {
        whyOk: "Верно! <i>they were playing</i>, <i>we were waiting</i> — were + -ing.",
        bridge:
          "Сравни: <i>he <b>was</b> playing</i> ↔ <i>they <b>were</b> playing</i>. Множественное → were.",
        rule: "Множественное → <b>were</b> + -ing.",
      },
    },
  },
  {
    topic: "past-continuous",
    kind: "past-continuous",
    ru: "Она готовила, когда я позвонил.",
    correct: ["She", "was", "cooking", "when", "I", "called"],
    bank: ["She", "was", "cooking", "when", "I", "called", "were", "cooked"],
    subject: "She",
    whyOk: "Верно! Длительное (<b>was cooking</b>) прервано коротким (<b>called</b>).",
    bridge:
      "Частый случай: фон в процессе (<b>was cooking</b>, Past Continuous) + короткое действие, которое его прервало (<b>called</b>, Past Simple). <b>She was cooking when I called</b>.",
    rule: "Фон → <b>was/were + -ing</b>, прерывание → Past Simple (when + called).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>was cooking</b> (фон) + <b>called</b> (момент).",
        bridge:
          "Долгое на фоне → Past Continuous (<b>was cooking</b>). Внезапное короткое → Past Simple (<b>called</b>). Связка — <b>when</b>.",
        rule: "was/were + -ing (фон) + when + Past Simple.",
      },
      "examples-first": {
        whyOk: "Верно! <i>was cooking … when … called</i> — длинное + короткое.",
        bridge:
          "Образец: <i>I <b>was reading</b> when she <b>came</b></i>. Фон в -ing, прерывание в простом прошедшем.",
        rule: "Фон -ing + when + действие.",
      },
    },
  },
];

// ── used to: раньше делал, теперь нет ───────────────────────────────────────
export const USED_TO: LessonItem[] = [
  {
    topic: "used-to",
    kind: "used-to",
    ru: "Раньше я жил в Лондоне.",
    correct: ["I", "used", "to", "live", "in", "London"],
    bank: ["I", "used", "to", "live", "in", "London", "lived", "use"],
    subject: "I",
    whyOk: "Верно! Привычка в прошлом → <b>used to + глагол</b>: <b>used to live</b>.",
    bridge:
      "<b>used to</b> = «раньше (регулярно), а теперь нет». После него глагол в начальной форме: <b>used to live</b> (не «used to lived»).",
    rule: "<b>used to + V</b> (база). Раньше делал, сейчас уже нет.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: used to + <b>live</b> (база).",
        bridge:
          "Конструкция <b>used to</b> + простой глагол: used to <b>live</b>. <b>I used to live in London</b> — раньше жил.",
        rule: "<b>used to</b> + начальная форма глагола.",
      },
      "examples-first": {
        whyOk: "Верно! <i>used to live</i>, <i>used to play</i>, <i>used to smoke</i> — used to + база.",
        bridge:
          "Ряд: <i>I <b>used to</b> live here</i> · <i>I <b>used to</b> play tennis</i>. «Раньше, а теперь нет» → used to + глагол.",
        rule: "«Раньше делал» → <b>used to</b> + V.",
      },
    },
  },
  {
    topic: "used-to",
    kind: "used-to",
    ru: "Она раньше играла на пианино.",
    correct: ["She", "used", "to", "play", "piano"],
    bank: ["She", "used", "to", "play", "piano", "played", "uses"],
    subject: "She",
    whyOk: "Верно! <b>used to</b> одинаково для всех лиц (и для she — used, не uses).",
    bridge:
      "<b>used to</b> не меняется по лицам: и для she — <b>used to play</b> (не «uses to»). Глагол после — простой.",
    rule: "<b>used to</b> + V — форма одна для всех лиц.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → <b>used to play</b>.",
        bridge:
          "Для любого лица — <b>used to</b> + база. she used to <b>play</b>. <b>She used to play piano</b>.",
        rule: "used to + V (для всех лиц).",
      },
      "examples-first": {
        whyOk: "Верно! <i>she used to play</i>, <i>he used to work</i> — форма одна.",
        bridge:
          "Сравни: <i>she <b>plays</b> now</i> ↔ <i>she <b>used to play</b> before</i>. Привычка в прошлом → used to.",
        rule: "she used to + V.",
      },
    },
  },
  {
    topic: "used-to",
    kind: "used-to",
    ru: "Мы раньше жили у моря.",
    correct: ["We", "used", "to", "live", "by", "the", "sea"],
    bank: ["We", "used", "to", "live", "by", "the", "sea", "lived"],
    subject: "We",
    whyOk: "Верно! <b>used to live</b> — долгая привычка/состояние в прошлом.",
    bridge:
      "«Раньше жили» (длительно, теперь нет) → <b>used to live</b>. <b>by the sea</b> = «у моря».",
    rule: "<b>used to + V</b> для прошлых состояний: used to live, used to have.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: we → <b>used to live</b>.",
        bridge:
          "used to + база live. <b>We used to live by the sea</b> — раньше жили, теперь нет.",
        rule: "used to + V (состояние в прошлом).",
      },
      "examples-first": {
        whyOk: "Верно! <i>used to live</i>, <i>used to have</i> — прошлые состояния.",
        bridge:
          "Ряд: <i>we <b>used to</b> live here</i> · <i>they <b>used to</b> have a dog</i>.",
        rule: "Прошлое состояние → used to + V.",
      },
    },
  },
];
