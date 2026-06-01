// Контент B1 · Юнит 2 «Времена Perfect» (кураторский, см. content.ts).
// Темы: present-perfect-continuous, past-perfect, for-since, just-already-yet.

import type { LessonItem } from "./items";

// ── Present Perfect Continuous: have been doing ────────────────────────────
export const PRESENT_PERFECT_CONTINUOUS: LessonItem[] = [
  {
    topic: "present-perfect-continuous",
    kind: "present-perfect-continuous",
    ru: "Я учу английский два года.",
    correct: ["I", "have", "been", "learning", "English", "for", "two", "years"],
    bank: ["I", "have", "been", "learning", "English", "for", "two", "years", "learned", "since"],
    subject: "I",
    whyOk: "Верно! Действие длится до сейчас → <b>have been + -ing</b>: <b>have been learning</b>.",
    bridge:
      "Present Perfect Continuous показывает процесс, который начался в прошлом и всё ещё важен сейчас. «Учу два года» = процесс до настоящего: <b>I have been learning English for two years</b>.",
    rule: "Процесс до сейчас: <b>have/has been + V-ing</b> + for/since.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>have been learning</b> = процесс до настоящего.",
        bridge:
          "Формула: <b>have/has been + -ing</b>. Подлежащее I → have, дальше been + learning. Длительность → <b>for two years</b>.",
        rule: "<b>I/you/we/they have been + V-ing</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I have been learning</i>, <i>I have been working</i> — процесс всё ещё тянется.",
        bridge:
          "Ряд: <i>I have been <b>studying</b> for months</i> · <i>We have been <b>waiting</b></i>. Слышишь «уже сколько-то» → have been + -ing.",
        rule: "«Уже сколько-то делаю» → <b>have been + -ing</b>.",
      },
    },
  },
  {
    topic: "present-perfect-continuous",
    kind: "present-perfect-continuous",
    ru: "Она ждёт уже час.",
    correct: ["She", "has", "been", "waiting", "for", "an", "hour"],
    bank: ["She", "has", "been", "waiting", "for", "an", "hour", "waited", "have"],
    subject: "She",
    whyOk: "Верно! С <b>she</b> → <b>has been waiting</b>: процесс длится уже час.",
    bridge:
      "Если процесс начался раньше и продолжается/виден сейчас, берём Perfect Continuous. Для she вспомогательный <b>has</b>: <b>She has been waiting for an hour</b>.",
    rule: "he/she/it → <b>has been + V-ing</b>. Длительность: <b>for an hour</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → <b>has</b>, процесс → <b>been waiting</b>.",
        bridge:
          "Проверка по шагам: кто? she → has. Что за время? процесс до сейчас → been + waiting. Сколько? for an hour.",
        rule: "<b>has been + V-ing</b> для he/she/it.",
      },
      "examples-first": {
        whyOk: "Верно! <i>She has been waiting</i>, <i>He has been working</i> — третье лицо берёт has.",
        bridge:
          "Сравни: <i>I <b>have been waiting</b></i> ↔ <i>she <b>has been waiting</b></i>. Меняется только have/has.",
        rule: "she/he/it → <b>has been</b>.",
      },
    },
  },
  {
    topic: "present-perfect-continuous",
    kind: "present-perfect-continuous",
    ru: "Они работают весь день.",
    correct: ["They", "have", "been", "working", "all", "day"],
    bank: ["They", "have", "been", "working", "all", "day", "worked", "has"],
    subject: "They",
    whyOk: "Верно! «Весь день работают» как процесс до сейчас → <b>have been working</b>.",
    bridge:
      "<b>All day</b> подчёркивает длительность процесса. Не просто факт «поработали», а процесс, который тянулся: <b>They have been working all day</b>.",
    rule: "Длительный процесс с all day/all morning → <b>have been + V-ing</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: they → <b>have been working</b>.",
        bridge:
          "They берёт have. Длительный процесс → been + working. <b>All day</b> ставим в конце как маркер длительности.",
        rule: "they/we/you → <b>have been + V-ing</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>They have been working all day</i>, <i>We have been talking all morning</i>.",
        bridge:
          "Когда фокус на том, что действие длилось, английский любит форму <b>have been doing</b>, а не простой perfect.",
        rule: "Фокус на длительности → <b>have been doing</b>.",
      },
    },
  },
];

// ── Past Perfect: had done ─────────────────────────────────────────────────
export const PAST_PERFECT: LessonItem[] = [
  {
    topic: "past-perfect",
    kind: "past-perfect",
    ru: "Когда я пришёл, она уже ушла.",
    correct: ["When", "I", "arrived", "she", "had", "already", "left"],
    bank: ["When", "I", "arrived", "she", "had", "already", "left", "has", "leaves"],
    subject: "she",
    whyOk: "Верно! Более раннее прошлое → <b>had + V3</b>: <b>had already left</b>.",
    bridge:
      "Past Perfect нужен, когда есть два момента в прошлом. Сначала она ушла, потом я пришёл. Более раннее действие ставим в <b>had + V3</b>: <b>she had already left</b>.",
    rule: "Раньше другого прошлого → <b>had + V3</b>. had left, had done, had seen.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had + <b>left</b> показывает более раннее прошлое.",
        bridge:
          "Линия времени: 1) she had left, 2) I arrived. Для события №1 берём Past Perfect: <b>had + V3</b>.",
        rule: "Past Perfect = <b>had + V3</b> для «ещё раньше».",
      },
      "examples-first": {
        whyOk: "Верно! <i>she had left before I arrived</i>, <i>he had eaten before I came</i>.",
        bridge:
          "Сравни два прошлого: <i>I arrived</i> (позже) и <i>she <b>had left</b></i> (раньше). Раннее прошлое → had + V3.",
        rule: "Событие раньше другого прошлого → <b>had + V3</b>.",
      },
    },
  },
  {
    topic: "past-perfect",
    kind: "past-perfect",
    ru: "Я не видел этот фильм раньше.",
    correct: ["I", "had", "not", "seen", "this", "film", "before"],
    bank: ["I", "had", "not", "seen", "this", "film", "before", "saw", "have"],
    subject: "I",
    whyOk: "Верно! До того момента в прошлом опыта не было → <b>had not seen</b>.",
    bridge:
      "Если речь про опыт до определённого прошлого момента, нужен Past Perfect. «Раньше не видел» = к тому моменту не имел опыта: <b>I had not seen this film before</b>.",
    rule: "Отрицание Past Perfect: <b>had not + V3</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had not + <b>seen</b> (V3).",
        bridge:
          "Собираем: подлежащее + <b>had not</b> + третья форма. see → seen. before показывает «до того момента».",
        rule: "<b>had not + V3</b> = не сделал до прошлого момента.",
      },
      "examples-first": {
        whyOk: "Верно! <i>had not seen</i>, <i>had not met</i>, <i>had not tried</i> — опыта до прошлого момента не было.",
        bridge:
          "Образец: <i>I <b>had not met</b> him before the party</i>. Всё, что было «до вечеринки», уходит в Past Perfect.",
        rule: "«До того не…» → <b>had not + V3</b>.",
      },
    },
  },
  {
    topic: "past-perfect",
    kind: "past-perfect",
    ru: "Он закончил работу до встречи.",
    correct: ["He", "had", "finished", "the", "work", "before", "the", "meeting"],
    bank: ["He", "had", "finished", "the", "work", "before", "the", "meeting", "has", "finish"],
    subject: "He",
    whyOk: "Верно! Действие завершилось до другого прошлого события → <b>had finished</b>.",
    bridge:
      "Встреча тоже в прошлом, а работа была завершена ещё раньше. Такой «пред-прошлый» слой английский показывает через <b>had finished</b>.",
    rule: "До события в прошлом: <b>had + V3</b> + before.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>had finished</b> стоит до before the meeting.",
        bridge:
          "before the meeting задаёт второй прошлый момент. Всё, что завершилось до него, ставим в Past Perfect: had + finished.",
        rule: "<b>had + V3</b> before + past moment.",
      },
      "examples-first": {
        whyOk: "Верно! <i>had finished before the meeting</i>, <i>had left before dinner</i>.",
        bridge:
          "Ряд: <i>He <b>had finished</b> before 6</i> · <i>They <b>had arrived</b> before us</i>. Раньше точки в прошлом → had + V3.",
        rule: "Раньше прошлой точки → <b>had + V3</b>.",
      },
    },
  },
];

// ── for / since: длительность и точка отсчёта ──────────────────────────────
export const FOR_SINCE: LessonItem[] = [
  {
    topic: "for-since",
    kind: "for-since",
    ru: "Мы живём здесь с 2020 года.",
    correct: ["We", "have", "lived", "here", "since", "2020"],
    bank: ["We", "have", "lived", "here", "since", "2020", "for", "live"],
    subject: "We",
    whyOk: "Верно! Точка старта → <b>since 2020</b>, действие тянется до сейчас.",
    bridge:
      "<b>Since</b> отвечает на вопрос «с какого момента?». 2020 — точка отсчёта, поэтому <b>since 2020</b>. Само действие до сих пор → Present Perfect: <b>have lived</b>.",
    rule: "<b>since + точка старта</b>: since 2020, since Monday, since May.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: have lived + <b>since 2020</b>.",
        bridge:
          "Сначала время: длится до сейчас → have lived. Потом маркер: 2020 это точка, значит since, не for.",
        rule: "точка во времени → <b>since</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>since 2020</i>, <i>since Monday</i>, <i>since May</i> — стартовая точка.",
        bridge:
          "Сравни: <i>for two years</i> (отрезок) ↔ <i>since 2020</i> (точка старта). Здесь именно 2020.",
        rule: "«с какого момента» → <b>since</b>.",
      },
    },
  },
  {
    topic: "for-since",
    kind: "for-since",
    ru: "Я знаю его три года.",
    correct: ["I", "have", "known", "him", "for", "three", "years"],
    bank: ["I", "have", "known", "him", "for", "three", "years", "since", "knew"],
    subject: "I",
    whyOk: "Верно! Отрезок длительности → <b>for three years</b>.",
    bridge:
      "<b>For</b> отвечает на вопрос «как долго?». Three years — это отрезок, не точка старта. А «знаю до сих пор» → <b>have known</b>.",
    rule: "<b>for + длительность</b>: for three years, for a week, for an hour.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: отрезок <b>three years</b> требует for.",
        bridge:
          "Сначала видим длительность: three years. Это не дата и не момент, а промежуток. Поэтому <b>for three years</b>.",
        rule: "отрезок времени → <b>for</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>for three years</i>, <i>for ten minutes</i>, <i>for a long time</i>.",
        bridge:
          "Ряд: <i>for a day</i> · <i>for two months</i> · <i>for years</i>. Если можно спросить «как долго?» → for.",
        rule: "«как долго» → <b>for</b>.",
      },
    },
  },
  {
    topic: "for-since",
    kind: "for-since",
    ru: "Она работает здесь с мая.",
    correct: ["She", "has", "worked", "here", "since", "May"],
    bank: ["She", "has", "worked", "here", "since", "May", "for", "works"],
    subject: "She",
    whyOk: "Верно! May — точка начала, значит <b>since May</b>.",
    bridge:
      "Месяц как стартовая точка берёт <b>since</b>. Для she в Present Perfect нужен <b>has</b>: <b>She has worked here since May</b>.",
    rule: "he/she/it + <b>has + V3</b>; точка старта → <b>since</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → has worked, May → since.",
        bridge:
          "Две проверки: подлежащее she → has; May это момент старта → since. Получаем <b>has worked here since May</b>.",
        rule: "she/he/it → has; точка старта → since.",
      },
      "examples-first": {
        whyOk: "Верно! <i>since May</i>, <i>since Friday</i>, <i>since 9 a.m.</i> — точка начала.",
        bridge:
          "Сравни: <i>for two months</i> (длительность) ↔ <i>since May</i> (точка, откуда считаем).",
        rule: "Дата/день/месяц старта → <b>since</b>.",
      },
    },
  },
];

// ── just / already / yet: маркеры перфекта ─────────────────────────────────
export const JUST_ALREADY_YET: LessonItem[] = [
  {
    topic: "just-already-yet",
    kind: "just-already-yet",
    ru: "Я только что закончил.",
    correct: ["I", "have", "just", "finished"],
    bank: ["I", "have", "just", "finished", "already", "yet", "finish"],
    subject: "I",
    whyOk: "Верно! «Только что» → <b>have just + V3</b>: <b>have just finished</b>.",
    bridge:
      "<b>Just</b> ставим между have/has и третьей формой, когда действие произошло совсем недавно: <b>I have just finished</b>.",
    rule: "<b>have/has + just + V3</b> = только что сделал.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: have + <b>just</b> + finished.",
        bridge:
          "Порядок фиксированный: подлежащее → have/has → just → V3. finish → finished.",
        rule: "<b>just</b> стоит перед V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>have just finished</i>, <i>has just arrived</i> — событие совсем свежее.",
        bridge:
          "Ряд: <i>I have <b>just</b> eaten</i> · <i>She has <b>just</b> called</i>. «Только что» → just.",
        rule: "«только что» → <b>just</b>.",
      },
    },
  },
  {
    topic: "just-already-yet",
    kind: "just-already-yet",
    ru: "Она уже ушла.",
    correct: ["She", "has", "already", "left"],
    bank: ["She", "has", "already", "left", "yet", "just", "leave"],
    subject: "She",
    whyOk: "Верно! «Уже» в утверждении → <b>has already left</b>.",
    bridge:
      "<b>Already</b> часто стоит между has/have и V3 в утверждении: действие случилось раньше ожидаемого или уже готово. <b>She has already left</b>.",
    rule: "<b>have/has + already + V3</b> в утверждениях.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: she → has, already перед V3.",
        bridge:
          "Утверждение с «уже»: подлежащее + has/have + already + третья форма. leave → left.",
        rule: "already обычно стоит перед V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>has already left</i>, <i>have already done</i> — уже случилось.",
        bridge:
          "Сравни: <i>She has <b>already</b> left</i> (уже ушла) ↔ <i>Has she left <b>yet</b>?</i> (уже ушла?).",
        rule: "Утверждение «уже» → <b>already</b>.",
      },
    },
  },
  {
    topic: "just-already-yet",
    kind: "just-already-yet",
    ru: "Ты ещё не позвонил ему.",
    correct: ["You", "haven't", "called", "him", "yet"],
    bank: ["You", "haven't", "called", "him", "yet", "already", "didn't"],
    subject: "You",
    whyOk: "Верно! В отрицании «ещё не» → <b>haven't + V3 + yet</b>.",
    bridge:
      "<b>Yet</b> обычно ставится в конце отрицаний и вопросов. «Ещё не позвонил» = <b>You haven't called him yet</b>.",
    rule: "Отрицание: <b>haven't/hasn't + V3 + yet</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: haven't + called + <b>yet</b> в конце.",
        bridge:
          "Собираем отрицание Perfect: подлежащее + haven't/hasn't + V3. Маркер yet уходит в конец.",
        rule: "<b>yet</b> в отрицаниях обычно в конце.",
      },
      "examples-first": {
        whyOk: "Верно! <i>haven't called yet</i>, <i>hasn't arrived yet</i> — ещё не.",
        bridge:
          "Ряд: <i>I haven't eaten <b>yet</b></i> · <i>They haven't finished <b>yet</b></i>. «Ещё не» → yet в конце.",
        rule: "«ещё не» → <b>not … yet</b>.",
      },
    },
  },
];
