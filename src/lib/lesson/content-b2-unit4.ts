// Контент B2 · Юнит 4 «Стиль и связки» (кураторский, см. content.ts).
// Темы: inversion, participle-clauses, cleft-sentences, advanced-linkers.
// Формат sentence-builder: пунктуацию-токены НЕ используем (бан-лист банка),
// запятую причастного/связочного оборота объясняем словами в подсказках.

import type { LessonItem } from "./items";

// ── Инверсия: отрицательное наречие в начале → вспомог. перед подлежащим ──────
export const INVERSION: LessonItem[] = [
  {
    topic: "inversion",
    kind: "inversion",
    ru: "Никогда я не видел такого.",
    correct: ["Never", "have", "I", "seen", "such", "a", "thing"],
    bank: ["Never", "have", "I", "seen", "such", "a", "thing", "saw", "did"],
    subject: "I",
    whyOk:
      "Верно! После <b>Never</b> в начале — инверсия: вспомогательный <b>have</b> идёт ПЕРЕД <b>I</b> → <b>Never have I seen</b>.",
    bridge:
      "Отрицательное наречие (Never, Rarely, Seldom) в начале фразы переворачивает порядок: сначала вспомогательный глагол, потом подлежащее. Обычное «I have never seen» → эмфатичное <b>Never have I seen</b>.",
    rule: "Never/Rarely/Seldom в начале → <b>вспомогательный + подлежащее</b> (Never have I…).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Never + have + I + seen.",
        bridge:
          "Схема: <b>Never/Rarely + aux + подлежащее + смысловой глагол</b>. Never have I seen.",
        rule: "Отриц. наречие → инверсия вспомогательного и подлежащего.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Never have I…</i>, <i>Rarely do we…</i>, <i>Seldom has she…</i> — везде инверсия.",
        bridge:
          "Сравни: <i>I have never seen this</i> (нейтрально) ↔ <i><b>Never have I</b> seen this</i> (книжно, выразительно).",
        rule: "«Никогда/редко» в начале → перевернуть aux и подлежащее.",
      },
    },
  },
  {
    topic: "inversion",
    kind: "inversion",
    ru: "Ни при каких обстоятельствах нельзя открывать дверь.",
    correct: ["Under", "no", "circumstances", "should", "you", "open", "the", "door"],
    bank: ["Under", "no", "circumstances", "should", "you", "open", "the", "door", "must", "can"],
    subject: "you",
    whyOk:
      "Верно! После <b>Under no circumstances</b> — инверсия: модальный <b>should</b> перед <b>you</b>.",
    bridge:
      "Отрицательная конструкция в начале (Under no circumstances, At no time) требует инверсии: модальный/вспомогательный глагол встаёт ПЕРЕД подлежащим. <b>Under no circumstances should you open…</b>",
    rule: "Under no circumstances / At no time + <b>модальный + подлежащее</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Under no circumstances + should + you.",
        bridge:
          "Схема: <b>Under no circumstances + should/can + подлежащее</b>. should you open.",
        rule: "Отрицательная фраза в начале → инверсия модального.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Under no circumstances should you…</i>, <i>At no time did they…</i>.",
        bridge:
          "Сравни: <i>you should not open it</i> ↔ <i><b>Under no circumstances should you</b> open it</i> (категоричнее).",
        rule: "«Ни при каких…» в начале → модальный перед подлежащим.",
      },
    },
  },
  {
    topic: "inversion",
    kind: "inversion",
    ru: "Едва она ушла, как зазвонил телефон.",
    correct: ["Hardly", "had", "she", "left", "when", "the", "phone", "rang"],
    bank: ["Hardly", "had", "she", "left", "when", "the", "phone", "rang", "has", "leave"],
    subject: "she",
    whyOk:
      "Верно! <b>Hardly</b> в начале → инверсия с Past Perfect: <b>Hardly had she left when…</b>",
    bridge:
      "Связка «едва… как…» = <b>Hardly had + подлежащее + V3 … when + past</b>. Первое (раннее) действие — в Past Perfect с инверсией, второе — в Past Simple. <b>Hardly had she left when the phone rang</b>.",
    rule: "<b>Hardly had + подлежащее + V3 … when + Past Simple</b> («едва… как…»).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Hardly + had + she + left … when.",
        bridge:
          "Схема: <b>Hardly had + S + V3 … when + past</b>. had she left … when the phone rang.",
        rule: "Hardly had + S + V3 … when + Past Simple.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Hardly had I… when…</i>, <i>No sooner had we… than…</i> — раннее действие в Past Perfect.",
        bridge:
          "Сравни: <i>she had hardly left when…</i> ↔ <i><b>Hardly had she</b> left when…</i> (тот же смысл, выразительнее).",
        rule: "«Едва… как…» → Hardly had + S + V3 … when + past.",
      },
    },
  },
];

// ── Причастные обороты: -ing/-ed-оборот заменяет придаточное ──────────────────
export const PARTICIPLE_CLAUSES: LessonItem[] = [
  {
    topic: "participle-clauses",
    kind: "participle-clauses",
    ru: "Идя домой, я встретил Тома.",
    correct: ["Walking", "home", "I", "met", "Tom"],
    bank: ["Walking", "home", "I", "met", "Tom", "Walked", "walk"],
    subject: "I",
    whyOk:
      "Верно! Причастный оборот <b>Walking home</b> заменяет «когда я шёл домой» → <b>Walking home, I met Tom</b> (на письме с запятой).",
    bridge:
      "Когда у двух действий одно подлежащее, первое можно свернуть в -ing-оборот: «While I was walking home, I met Tom» → <b>Walking home, I met Tom</b>. На письме оборот отделяется запятой.",
    rule: "Одно подлежащее на два действия → первое сворачиваем в <b>V-ing</b> (Walking home, …).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Walking (V-ing) + home, затем основная часть.",
        bridge:
          "Схема: <b>V-ing + …, подлежащее + сказуемое</b>. Walking home, I met Tom.",
        rule: "Свернуть придаточное в V-ing-оборот.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Walking home…</i>, <i>Opening the door…</i>, <i>Feeling tired…</i> — все начинаются с V-ing.",
        bridge:
          "Сравни: <i>While I was walking home, I met Tom</i> ↔ <i><b>Walking home</b>, I met Tom</i> (короче, живее).",
        rule: "«Когда/пока делал…» → V-ing-оборот в начале.",
      },
    },
  },
  {
    topic: "participle-clauses",
    kind: "participle-clauses",
    ru: "Не зная ответа, она промолчала.",
    correct: ["Not", "knowing", "the", "answer", "she", "said", "nothing"],
    bank: ["Not", "knowing", "the", "answer", "she", "said", "nothing", "know", "knew"],
    subject: "she",
    whyOk:
      "Верно! Отрицательный причастный оборот: <b>Not knowing the answer</b> = «так как не знала ответа».",
    bridge:
      "Причина тоже сворачивается в -ing-оборот, а отрицание ставится словом <b>Not</b> ПЕРЕД причастием: «Because she didn’t know…» → <b>Not knowing the answer, she said nothing</b>.",
    rule: "Отрицание оборота → <b>Not + V-ing</b> (Not knowing…).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Not + knowing + the answer.",
        bridge:
          "Схема: <b>Not + V-ing + …, подлежащее + сказуемое</b>. Not knowing the answer, she said nothing.",
        rule: "Not ставится перед причастием.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Not knowing…</i>, <i>Not having seen it…</i> — отрицание через Not перед -ing.",
        bridge:
          "Сравни: <i>Because she didn’t know the answer, she…</i> ↔ <i><b>Not knowing</b> the answer, she…</i>.",
        rule: "«Не зная/не сделав…» → Not + V-ing.",
      },
    },
  },
  {
    topic: "participle-clauses",
    kind: "participle-clauses",
    ru: "Законченная вовремя, работа всех впечатлила.",
    correct: ["Finished", "on", "time", "the", "work", "impressed", "everyone"],
    bank: ["Finished", "on", "time", "the", "work", "impressed", "everyone", "Finishing", "finish"],
    subject: "the work",
    whyOk:
      "Верно! Пассивный причастный оборот: <b>Finished on time</b> (3-я форма) = «будучи законченной вовремя».",
    bridge:
      "Если действие СДЕЛАНО НАД подлежащим (пассив), оборот строится через причастие прошедшего времени (V3): «As it was finished on time…» → <b>Finished on time, the work impressed everyone</b>.",
    rule: "Пассивный оборот → <b>V3</b> в начале (Finished on time, …).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Finished (V3), не Finishing.",
        bridge:
          "Активный оборот → V-ing; пассивный → <b>V3</b>. Finished on time, the work impressed everyone.",
        rule: "Пассив → причастие прошедшего (V3).",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Finished on time…</i>, <i>Built in 1990…</i>, <i>Written in haste…</i> — все V3.",
        bridge:
          "Сравни: активное <i><b>Finishing</b> the work</i> (она заканчивает) ↔ пассивное <i><b>Finished</b> on time</i> (её закончили).",
        rule: "«Будучи сделанным…» → V3-оборот.",
      },
    },
  },
];

// ── Эмфаза (cleft): It was X that… / What … is … ─────────────────────────────
export const CLEFT_SENTENCES: LessonItem[] = [
  {
    topic: "cleft-sentences",
    kind: "cleft-sentences",
    ru: "Именно Том разбил окно.",
    correct: ["It", "was", "Tom", "who", "broke", "the", "window"],
    bank: ["It", "was", "Tom", "who", "broke", "the", "window", "that", "is"],
    subject: "It",
    whyOk:
      "Верно! Конструкция выделения: <b>It was Tom who…</b> подчёркивает, что это был именно Том.",
    bridge:
      "Чтобы выделить часть фразы, используем <b>It + was/is + X + who/that…</b>. «Tom broke the window» → <b>It was Tom who broke the window</b> (именно Том, а не кто-то). Про людей — who, про вещи — that.",
    rule: "<b>It was + выделяемое + who/that + …</b> («именно X…»).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: It + was + Tom + who.",
        bridge:
          "Схема: <b>It is/was + X + who/that + остальное</b>. It was Tom who broke the window.",
        rule: "It was + X + who/that.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>It was Tom who…</i>, <i>It was here that…</i>, <i>It is you who…</i>.",
        bridge:
          "Сравни: <i>Tom broke the window</i> (нейтрально) ↔ <i><b>It was Tom who</b> broke the window</i> (именно Том).",
        rule: "«Именно X сделал…» → It was X who…",
      },
    },
  },
  {
    topic: "cleft-sentences",
    kind: "cleft-sentences",
    ru: "Именно вчера мы встретились.",
    correct: ["It", "was", "yesterday", "that", "we", "met"],
    bank: ["It", "was", "yesterday", "that", "we", "met", "when", "is"],
    subject: "It",
    whyOk:
      "Верно! Выделяем время: <b>It was yesterday that we met</b> (именно вчера, не в другой день).",
    bridge:
      "Тем же шаблоном выделяют обстоятельство: <b>It + was + время/место + that + …</b>. После времени/места ставим <b>that</b> (не when/where). <b>It was yesterday that we met</b>.",
    rule: "Выделение времени/места → <b>It was + X + that + …</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: It + was + yesterday + that.",
        bridge:
          "Схема: <b>It was + обстоятельство + that + …</b>. It was yesterday that we met.",
        rule: "После выделенного времени/места — that.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>It was yesterday that…</i>, <i>It was in Paris that…</i>.",
        bridge:
          "Сравни: <i>we met yesterday</i> ↔ <i><b>It was yesterday that</b> we met</i> (акцент на «вчера»).",
        rule: "«Именно тогда/там…» → It was X that…",
      },
    },
  },
  {
    topic: "cleft-sentences",
    kind: "cleft-sentences",
    ru: "Что мне нужно — так это отдых.",
    correct: ["What", "I", "need", "is", "a", "rest"],
    bank: ["What", "I", "need", "is", "a", "rest", "that", "are"],
    subject: "I",
    whyOk:
      "Верно! Wh-cleft: <b>What I need is a rest</b> выделяет, ЧТО именно нужно.",
    bridge:
      "Второй тип выделения начинается с <b>What…</b>: «What + подлежащее + глагол + <b>is</b> + выделяемое». «I need a rest» → <b>What I need is a rest</b>. Глагол-связка всегда <b>is</b> (ед. ч.).",
    rule: "<b>What + S + V + is + …</b> («что … — так это …»).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: What + I + need + is + a rest.",
        bridge:
          "Схема: <b>What + подлежащее + глагол + is + выделяемое</b>. What I need is a rest.",
        rule: "What … is … (связка is).",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>What I need is…</i>, <i>What he wants is…</i>, <i>What matters is…</i>.",
        bridge:
          "Сравни: <i>I need a rest</i> ↔ <i><b>What I need is</b> a rest</i> (подчёркивает суть).",
        rule: "«Что мне нужно — это…» → What I need is…",
      },
    },
  },
];

// ── Связки: despite / although / however ─────────────────────────────────────
export const ADVANCED_LINKERS: LessonItem[] = [
  {
    topic: "advanced-linkers",
    kind: "advanced-linkers",
    ru: "Несмотря на дождь, мы вышли.",
    correct: ["Despite", "the", "rain", "we", "went", "out"],
    bank: ["Despite", "the", "rain", "we", "went", "out", "Although", "However"],
    subject: "we",
    whyOk:
      "Верно! <b>Despite</b> + существительное: <b>Despite the rain</b> = «несмотря на дождь».",
    bridge:
      "После <b>Despite</b> (и <b>In spite of</b>) идёт СУЩЕСТВИТЕЛЬНОЕ или -ing, НЕ целое предложение. «Despite the rain» ✓, но «Despite it rained» ✗ (там нужно Although).",
    rule: "<b>Despite / In spite of + существительное/-ing</b> (без подлежащего+глагола).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Despite + the rain (существительное).",
        bridge:
          "Despite + сущ./-ing. Despite the rain, we went out. (НЕ Despite it rained.)",
        rule: "Despite + существительное, не предложение.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Despite the rain</i>, <i>Despite being tired</i> — после Despite сущ. или -ing.",
        bridge:
          "Сравни: <i><b>Despite</b> the rain</i> (+ сущ.) ↔ <i><b>Although</b> it rained</i> (+ предложение) — смысл один.",
        rule: "Despite → сущ./-ing; Although → предложение.",
      },
    },
  },
  {
    topic: "advanced-linkers",
    kind: "advanced-linkers",
    ru: "Хотя он устал, он продолжил.",
    correct: ["Although", "he", "was", "tired", "he", "continued"],
    bank: ["Although", "he", "he", "was", "tired", "continued", "Despite", "However"],
    subject: "he",
    whyOk:
      "Верно! <b>Although</b> + целое предложение: <b>Although he was tired</b> = «хотя он устал».",
    bridge:
      "После <b>Although</b> (и <b>Though</b>) идёт полноценное предложение — подлежащее + глагол. «Although he was tired» ✓. Сравни с Despite, после которого только существительное.",
    rule: "<b>Although / Though + подлежащее + глагол</b> (целое предложение).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: Although + he + was + tired (предложение).",
        bridge:
          "Although + подлежащее + глагол. Although he was tired, he continued.",
        rule: "Although + предложение (S + V).",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>Although he was tired</i>, <i>Although it rained</i> — после Although идёт S + V.",
        bridge:
          "Сравни: <i><b>Although</b> he was tired</i> (+ предложение) ↔ <i><b>Despite</b> being tired</i> (+ -ing).",
        rule: "Although → предложение; Despite → сущ./-ing.",
      },
    },
  },
  {
    topic: "advanced-linkers",
    kind: "advanced-linkers",
    ru: "Однако еда была вкусной.",
    correct: ["However", "the", "food", "was", "delicious"],
    bank: ["However", "the", "food", "was", "delicious", "Although", "Despite"],
    subject: "the food",
    whyOk:
      "Верно! <b>However</b> начинает новое предложение-контраст: <b>However, the food was delicious</b>.",
    bridge:
      "<b>However</b> = «однако» — связывает ДВА отдельных предложения и стоит обычно в начале второго, отделяясь запятой: «It was expensive. <b>However</b>, the food was delicious». Это наречие, а не союз как although.",
    rule: "<b>However</b> = «однако», начинает новое предложение (с запятой).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: However + новое предложение.",
        bridge:
          "However, + подлежащее + глагол. However, the food was delicious.",
        rule: "However связывает отдельные предложения.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>However, the food was…</i>, <i>However, prices rose…</i> — новое предложение.",
        bridge:
          "Сравни: <i><b>Although</b> it was expensive, the food was good</i> (одно предложение) ↔ <i>It was expensive. <b>However</b>, the food was good</i> (два).",
        rule: "Although — внутри; However — между предложениями.",
      },
    },
  },
];
