// Контент Юнита 1 курса A1 (кураторский — «слой валидации = выверенный скелет»).
// Темы: to-be, pronouns, articles, plurals. Формат — sentence-builder, как у
// present-continuous. be/ing тут НЕ нужны (PC-специфика). Каждый айтем: плоские
// whyOk/bridge/rule (= contrast-native, наш сигнатурный «сравнение с русским»)
// + byConcept{rule-first, examples-first}; остальные концепции откатываются на
// плоские (explainFor). Все айтемы проходят validateLessonItem (см. content.test.ts).

import type { LessonItem } from "./items";
import { ITEMS } from "./items";
import { THERE_IS, PREPOSITIONS_PLACE, CAN_CANT } from "./content-unit3";
import {
  ADVERBS_FREQUENCY,
  LIKE_ING,
  NUMBERS_TIME,
  WH_QUESTIONS,
} from "./content-unit4";
import {
  PAST_SIMPLE,
  PAST_IRREGULAR,
  PAST_CONTINUOUS,
  USED_TO,
} from "./content-a2-unit1";
import {
  FUTURE_WILL,
  GOING_TO,
  FUTURE_TIME,
  PREDICTIONS,
} from "./content-a2-unit2";
import {
  COMPARATIVES,
  SUPERLATIVES,
  QUANTIFIERS,
  COUNTABLE,
} from "./content-a2-unit3";
import {
  PRESENT_PERFECT,
  PERFECT_VS_PAST,
  MODALS_ADVICE,
  ADVERBS_MANNER,
} from "./content-a2-unit4";
import {
  ZERO_CONDITIONAL,
  SECOND_CONDITIONAL,
  WISH_PAST,
  UNLESS,
} from "./content-b1-unit1";

// ── to-be: am / is / are как «быть» ─────────────────────────────────────────
const TO_BE: LessonItem[] = [
  {
    topic: "to-be",
    kind: "to-be",
    ru: "Я студент.",
    correct: ["I", "am", "a", "student"],
    bank: ["am", "I", "student", "a", "is"],
    subject: "I",
    whyOk:
      "Верно! По-русски «я студент» — без глагола. В английском связка <b>am</b> обязательна: <b>I am a student</b>.",
    bridge:
      "В русском мы говорим «я студент», «она дома» — глагол «быть» опускаем. В английском его опускать нельзя: нужен <b>am/is/are</b>. Для <b>I</b> всегда <b>am</b>.",
    rule: "Глагол «быть»: <b>I → am</b>, <b>he/she/it → is</b>, <b>we/you/they → are</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно по формуле: <b>I → am</b>. Подлежащее + be + остальное.",
        bridge:
          "Формула: <b>подлежащее + be</b>. Берёшь <b>I</b> → ставишь <b>am</b> → дальше «a student». Связка be — всегда между «кто» и «кто/какой».",
        rule: "<b>I am</b>, <b>you are</b>, <b>he/she/it is</b>, <b>we/they are</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I am a student</i>, <i>I am happy</i>, <i>I am here</i> — после <b>I</b> всегда <b>am</b>.",
        bridge:
          "Смотри ряд: <i>I <b>am</b> a student</i> · <i>I <b>am</b> tired</i> · <i>I <b>am</b> from Russia</i>. Везде после <b>I</b> идёт <b>am</b>. Это пара, которую запоминают первой.",
        rule: "Подмечай: <b>I</b> тянет за собой <b>am</b> — без исключений.",
      },
    },
  },
  {
    topic: "to-be",
    kind: "to-be",
    ru: "Она счастлива.",
    correct: ["She", "is", "happy"],
    bank: ["is", "She", "happy", "are", "am"],
    subject: "She",
    whyOk:
      "Верно! С <b>she/he/it</b> связка — <b>is</b>: <b>She is happy</b>. Не am и не are.",
    bridge:
      "По-русски «она счастлива» — без «есть». В английском нужна связка, и для третьего лица единственного (he/she/it) это <b>is</b>.",
    rule: "<b>he / she / it → is</b>. «Она счастлива» = <b>She is happy</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>She → is</b> (третье лицо ед.ч.).",
        bridge:
          "Шаг 1 — лицо: <b>she</b> относится к he/she/it → be = <b>is</b>. Шаг 2 — добавь, какая она: <b>happy</b>. Итог: <b>She is happy</b>.",
        rule: "<b>he/she/it + is</b>. Третье лицо ед.ч. всегда берёт <b>is</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>she is happy</i>, <i>he is tall</i>, <i>it is cold</i> — после he/she/it всегда <b>is</b>.",
        bridge:
          "Ряд: <i>he <b>is</b> busy</i> · <i>she <b>is</b> happy</i> · <i>it <b>is</b> new</i>. Третье лицо — это <b>is</b>. Твоя <b>she</b> сюда же.",
        rule: "he/she/it → <b>is</b>; запоминается на ряде примеров.",
      },
    },
  },
  {
    topic: "to-be",
    kind: "to-be",
    ru: "Они дома.",
    correct: ["They", "are", "at", "home"],
    bank: ["are", "They", "home", "at", "is"],
    subject: "They",
    whyOk: "Верно! С <b>we/you/they</b> связка — <b>are</b>: <b>They are at home</b>.",
    bridge:
      "«Они дома» по-русски без глагола. В английском нужна связка, и для множественного (we/you/they) это <b>are</b>. «Дома» = устойчивое <b>at home</b>.",
    rule: "<b>we / you / they → are</b>. «Они дома» = <b>They are at home</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>They → are</b> (множественное).",
        bridge:
          "Лицо <b>they</b> (как we/you) → be = <b>are</b>. Дальше место: <b>at home</b>. Собираешь: <b>They are at home</b>.",
        rule: "<b>we/you/they + are</b>. Множественное и «ты/вы» берут <b>are</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>they are at home</i>, <i>we are ready</i>, <i>you are right</i> — всюду <b>are</b>.",
        bridge:
          "Ряд: <i>we <b>are</b> friends</i> · <i>you <b>are</b> late</i> · <i>they <b>are</b> here</i>. Множественное → <b>are</b>.",
        rule: "we/you/they → <b>are</b>.",
      },
    },
  },
];

// ── pronouns: личные местоимения ────────────────────────────────────────────
const PRONOUNS: LessonItem[] = [
  {
    topic: "pronouns",
    kind: "pronouns",
    ru: "Он мой брат.",
    correct: ["He", "is", "my", "brother"],
    bank: ["He", "is", "my", "brother", "His", "She"],
    subject: "He",
    whyOk:
      "Верно! «Он» как подлежащее — <b>He</b> (не His). <b>He is my brother</b>.",
    bridge:
      "«Он» в роли «кто делает» — это <b>He</b>. <b>His</b> — это «его» (чей), другое слово. Раз он сам — берём <b>He</b>.",
    rule: "Подлежащие: <b>I, you, he, she, it, we, they</b>. «Он» = <b>He</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: подлежащее «он» = <b>He</b>, связка <b>is</b>.",
        bridge:
          "Местоимение-подлежащее отвечает на «кто?»: <b>He</b>. Дальше связка для he → <b>is</b>, потом «my brother». <b>He is my brother</b>.",
        rule: "Кто действует → <b>He/She/It…</b>; «его/её» (чей) → his/her — это другое.",
      },
      "examples-first": {
        whyOk: "Верно! <i>He is my brother</i>, <i>He is tall</i> — «он» как деятель всегда <b>He</b>.",
        bridge:
          "Сравни: <i><b>He</b> is here</i> (он здесь) vs <i>this is <b>his</b> book</i> (его книга). В первом «он сам» → He. У тебя именно это.",
        rule: "«Он сам что-то делает/есть» → <b>He</b>.",
      },
    },
  },
  {
    topic: "pronouns",
    kind: "pronouns",
    ru: "Мы готовы.",
    correct: ["We", "are", "ready"],
    bank: ["We", "are", "ready", "Us", "They"],
    subject: "We",
    whyOk: "Верно! «Мы» как подлежащее — <b>We</b> (не Us). <b>We are ready</b>.",
    bridge:
      "«Мы» — деятель, значит <b>We</b>. <b>Us</b> — это «нас/нам» (когда на нас действуют). Раз мы сами готовы — <b>We</b>.",
    rule: "Подлежащее «мы» = <b>We</b> + are. «Нас» = us — это дополнение.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: «мы» = <b>We</b>, лицо множественное → <b>are</b>.",
        bridge:
          "Кто? — <b>We</b>. Связка для we → <b>are</b>. Какие? — <b>ready</b>. Итог: <b>We are ready</b>.",
        rule: "<b>We</b> (кто) ≠ <b>us</b> (кого/кому). Подлежащее — We.",
      },
      "examples-first": {
        whyOk: "Верно! <i>We are ready</i>, <i>We are friends</i> — «мы» как деятель всегда <b>We</b>.",
        bridge:
          "Сравни: <i><b>We</b> are here</i> (мы здесь) vs <i>call <b>us</b></i> (позвони нам). У тебя «мы сами» → We.",
        rule: "«Мы делаем/есть» → <b>We</b>.",
      },
    },
  },
  {
    topic: "pronouns",
    kind: "pronouns",
    ru: "Это легко.",
    correct: ["It", "is", "easy"],
    bank: ["It", "is", "easy", "Its", "He"],
    subject: "It",
    whyOk:
      "Верно! О предмете/явлении говорим <b>It</b>: <b>It is easy</b>. Не Its (это «его/свой»).",
    bridge:
      "В русском «это легко» — без подлежащего. В английском нужен «кто/что»: для не-человека это <b>It</b>. <b>Its</b> — притяжательное, другое слово.",
    rule: "<b>It</b> — для предметов, погоды, явлений. «Это легко» = <b>It is easy</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: подлежащее-«оно» = <b>It</b>, связка <b>is</b>.",
        bridge:
          "Английскому нужно подлежащее всегда. Нет конкретного лица → ставим <b>It</b>. Затем <b>is</b> (it = третье лицо) + <b>easy</b>.",
        rule: "Нет «человека» в подлежащем → <b>It</b> + is.",
      },
      "examples-first": {
        whyOk: "Верно! <i>It is easy</i>, <i>It is cold</i>, <i>It is late</i> — о явлениях всегда <b>It</b>.",
        bridge:
          "Ряд: <i><b>It</b> is raining</i> · <i><b>It</b> is true</i> · <i><b>It</b> is easy</i>. Везде безличное «оно» = <b>It</b>.",
        rule: "Погода/факт/предмет → <b>It</b>.",
      },
    },
  },
];

// ── articles: a / an / the ──────────────────────────────────────────────────
const ARTICLES: LessonItem[] = [
  {
    topic: "articles",
    kind: "articles",
    ru: "Это яблоко.",
    correct: ["It", "is", "an", "apple"],
    bank: ["It", "is", "an", "apple", "a", "the"],
    subject: "It",
    whyOk:
      "Верно! Перед гласным звуком — <b>an</b>: <b>an apple</b>. Перед согласным был бы <b>a</b>.",
    bridge:
      "В русском артиклей нет, поэтому их легко забыть. Правило простое: один предмет «какой-то» → <b>a</b>, а перед гласным звуком (a, e, i, o, u) → <b>an</b>. <b>apple</b> начинается с гласного → <b>an apple</b>.",
    rule: "<b>a</b> + согласный звук, <b>an</b> + гласный звук. a dog, an apple.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно по правилу: <b>apple</b> с гласного → <b>an</b>.",
        bridge:
          "Шаг 1 — предмет один и «вообще» (не конкретный) → нужен a/an. Шаг 2 — первый звук гласный? Да (<b>a</b>pple) → <b>an</b>. Итог: <b>an apple</b>.",
        rule: "Один неопределённый предмет: <b>a</b>/<b>an</b>; выбор по первому звуку.",
      },
      "examples-first": {
        whyOk: "Верно! <i>an apple</i>, <i>an egg</i>, <i>an hour</i> — перед гласным звуком <b>an</b>.",
        bridge:
          "Сравни: <i><b>a</b> dog</i>, <i><b>a</b> car</i> (согласный) ↔ <i><b>an</b> apple</i>, <i><b>an</b> idea</i> (гласный). Слышишь гласный в начале → <b>an</b>.",
        rule: "Гласный звук в начале слова → <b>an</b>, иначе <b>a</b>.",
      },
    },
  },
  {
    topic: "articles",
    kind: "articles",
    ru: "У меня есть собака.",
    correct: ["I", "have", "a", "dog"],
    bank: ["I", "have", "a", "dog", "an", "the"],
    subject: "I",
    whyOk: "Верно! Одна «какая-то» собака → <b>a dog</b>. Перед согласным звуком — <b>a</b>.",
    bridge:
      "«Собака» тут впервые и неконкретная (просто одна) — значит нужен <b>a</b>. <b>dog</b> начинается с согласного звука → именно <b>a</b>, не an.",
    rule: "Впервые и один предмет → <b>a</b>/<b>an</b>. dog с согласного → <b>a dog</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: новый одиночный предмет + согласный звук → <b>a</b>.",
        bridge:
          "Предмет вводится впервые и в единственном числе → артикль a/an. Первый звук <b>d</b> — согласный → <b>a</b>. <b>a dog</b>.",
        rule: "Неопределённый ед.предмет: <b>a</b> (соглас.) / <b>an</b> (гласн.).",
      },
      "examples-first": {
        whyOk: "Верно! <i>a dog</i>, <i>a book</i>, <i>a friend</i> — перед согласным <b>a</b>.",
        bridge:
          "Ряд: <i>I have <b>a</b> dog</i> · <i>I have <b>a</b> car</i> · <i>I have <b>a</b> question</i>. Один новый предмет → <b>a</b>.",
        rule: "Один новый предмет с согласного → <b>a</b>.",
      },
    },
  },
  {
    topic: "articles",
    kind: "articles",
    ru: "Солнце яркое.",
    correct: ["The", "sun", "is", "bright"],
    bank: ["The", "sun", "is", "bright", "A", "An"],
    subject: "sun",
    whyOk:
      "Верно! Солнце одно-единственное → определённый артикль <b>the</b>: <b>The sun</b>.",
    bridge:
      "<b>a/an</b> — для «какого-то одного из многих». Но солнце <b>единственное</b>, оно всем известно — значит <b>the</b>. Уникальные вещи (the sun, the moon) берут <b>the</b>.",
    rule: "<b>the</b> — когда предмет конкретный/единственный. the sun, the moon, the sky.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: уникальный объект → <b>the</b>.",
        bridge:
          "Вопрос: предмет конкретный/единственный в своём роде? Солнце — да, оно одно. Значит <b>the</b>, а не a/an. <b>The sun is bright</b>.",
        rule: "Единственный/известный предмет → <b>the</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>the sun</i>, <i>the moon</i>, <i>the sky</i> — уникальное берёт <b>the</b>.",
        bridge:
          "Сравни: <i><b>a</b> star</i> (одна из миллионов) ↔ <i><b>the</b> sun</i> (оно одно). Уникальность → <b>the</b>.",
        rule: "Одно на всех (the sun) → <b>the</b>.",
      },
    },
  },
];

// ── plurals: множественное число ────────────────────────────────────────────
const PLURALS: LessonItem[] = [
  {
    topic: "plurals",
    kind: "plurals",
    ru: "У меня две кошки.",
    correct: ["I", "have", "two", "cats"],
    bank: ["I", "have", "two", "cats", "cat", "cates"],
    subject: "I",
    whyOk: "Верно! Много предметов → окончание <b>-s</b>: <b>cats</b>.",
    bridge:
      "В русском «две кошки» меняет окончание само. В английском проще: к большинству слов во множественном добавляем <b>-s</b>. cat → <b>cats</b>.",
    rule: "Множественное число: обычно <b>+s</b>. cat → cats, book → books.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: больше одного → <b>+s</b>. cats.",
        bridge:
          "Число больше 1 (<b>two</b>) → существительное во множественном. Базовое правило: добавь <b>-s</b>. <b>cat → cats</b>.",
        rule: "Множественное по умолчанию: основа + <b>s</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>cats</i>, <i>dogs</i>, <i>books</i> — везде <b>-s</b>.",
        bridge:
          "Ряд: <i>one cat → two <b>cats</b></i> · <i>one book → five <b>books</b></i>. Несколько → хвост <b>-s</b>.",
        rule: "Несколько предметов → <b>-s</b> на конце.",
      },
    },
  },
  {
    topic: "plurals",
    kind: "plurals",
    ru: "Эти коробки тяжёлые.",
    correct: ["These", "boxes", "are", "heavy"],
    bank: ["These", "boxes", "are", "heavy", "boxs", "box"],
    subject: "boxes",
    whyOk:
      "Верно! После шипящих (-x, -s, -ch, -sh) множественное на <b>-es</b>: <b>boxes</b>.",
    bridge:
      "Обычно множественное — это просто <b>-s</b>. Но если слово кончается на <b>-x, -s, -ch, -sh</b>, добавляем <b>-es</b> (чтобы выговорить): box → <b>boxes</b>.",
    rule: "После -x/-s/-ch/-sh → <b>-es</b>. box → boxes, bus → buses.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: основа на <b>-x</b> → множественное <b>-es</b>.",
        bridge:
          "Проверь конец слова: <b>box</b> кончается на -x → добавляем не -s, а <b>-es</b>. Получаем <b>boxes</b>. Связка для множественного → <b>are</b>.",
        rule: "Конец -x/-s/-ch/-sh → плюс <b>-es</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>boxes</i>, <i>buses</i>, <i>watches</i> — после шипящих <b>-es</b>.",
        bridge:
          "Ряд: <i>box → <b>boxes</b></i> · <i>brush → <b>brushes</b></i> · <i>class → <b>classes</b></i>. Шипящий конец → <b>-es</b>.",
        rule: "Свистящий/шипящий конец → <b>-es</b>.",
      },
    },
  },
  {
    topic: "plurals",
    kind: "plurals",
    ru: "Дети счастливы.",
    correct: ["The", "children", "are", "happy"],
    bank: ["The", "children", "are", "happy", "childs", "child"],
    subject: "children",
    whyOk:
      "Верно! <b>child</b> — особое слово: множественное <b>children</b>, а не childs.",
    bridge:
      "Большинство слов берут -s/-es, но есть исключения, которые надо просто запомнить: child → <b>children</b>, man → men, foot → feet. «Childs» не бывает.",
    rule: "Исключения: child→children, man→men, woman→women, foot→feet.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>child</b> — неправильное множественное → <b>children</b>.",
        bridge:
          "Сначала проверь, не исключение ли слово. <b>child</b> — да, его множественное <b>children</b> (не по правилу -s). Связка множественного → <b>are</b>.",
        rule: "Неправильные формы заучиваем: child → <b>children</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>child → children</i>, <i>man → men</i>, <i>foot → feet</i> — особые формы.",
        bridge:
          "Ряд исключений: <i>one child → many <b>children</b></i> · <i>one man → many <b>men</b></i>. Не -s, а своя форма.",
        rule: "Запомни исключения: <b>children</b>, men, women, feet.",
      },
    },
  },
];

// ══ ЮНИТ 2 · О себе и людях ══════════════════════════════════════════════════

// ── present-simple: регулярные действия ─────────────────────────────────────
const PRESENT_SIMPLE: LessonItem[] = [
  {
    topic: "present-simple",
    kind: "present-simple",
    ru: "Я работаю каждый день.",
    correct: ["I", "work", "every", "day"],
    bank: ["I", "work", "every", "day", "working"],
    subject: "I",
    whyOk: "Верно! Регулярное действие → Present Simple, глагол без изменений: <b>I work</b>.",
    bridge:
      "Present Simple — про «вообще, по жизни, регулярно». Сигнал <b>every day</b> (каждый день) — это про привычку, а не «прямо сейчас». Поэтому простое <b>work</b>, без -ing.",
    rule: "Регулярно/всегда → Present Simple: <b>I/you/we/they + глагол</b>. Сигналы: every day, usually.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: I + базовый глагол → <b>I work</b>.",
        bridge:
          "Формула Present Simple для I/you/we/they: <b>подлежащее + глагол</b> (без окончаний). <b>I work</b>. Маркер «every day» подтверждает регулярность.",
        rule: "<b>I/you/we/they + V</b> (база). he/she/it добавляет -s.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I work</i>, <i>I read</i>, <i>I play</i> — регулярное действие без хвостов.",
        bridge:
          "Сравни: <i>I <b>work</b> every day</i> (привычка) ↔ <i>I <b>am working</b> now</i> (сейчас). «Every day» → простая форма <b>work</b>.",
        rule: "«Каждый день / обычно» → глагол в простой форме.",
      },
    },
  },
  {
    topic: "present-simple",
    kind: "present-simple",
    ru: "Она любит кофе.",
    correct: ["She", "likes", "coffee"],
    bank: ["She", "likes", "coffee", "like"],
    subject: "She",
    whyOk: "Верно! С <b>he/she/it</b> в Present Simple глагол берёт <b>-s</b>: <b>likes</b>.",
    bridge:
      "Главная ловушка Present Simple: для третьего лица (he/she/it) к глаголу добавляется <b>-s</b>. «Она любит» = <b>She likes</b>, не «She like».",
    rule: "<b>he/she/it + глагол-s</b>. she likes, he works, it rains.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>She → likes</b> (третье лицо + -s).",
        bridge:
          "Правило -s: если подлежащее he/she/it, к глаголу добавь <b>-s</b>. like → <b>likes</b>. <b>She likes coffee</b>.",
        rule: "Третье лицо ед.ч. → глагол + <b>-s</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>she likes</i>, <i>he works</i>, <i>it costs</i> — везде <b>-s</b> после he/she/it.",
        bridge:
          "Ряд: <i>I like → she <b>likes</b></i> · <i>I work → he <b>works</b></i>. Третье лицо тянет <b>-s</b> на глагол.",
        rule: "he/she/it → глагол с <b>-s</b>.",
      },
    },
  },
  {
    topic: "present-simple",
    kind: "present-simple",
    ru: "Мы живём в Москве.",
    correct: ["We", "live", "in", "Moscow"],
    bank: ["We", "live", "in", "Moscow", "lives"],
    subject: "We",
    whyOk: "Верно! С <b>we</b> глагол без -s: <b>We live</b>. -s только для he/she/it.",
    bridge:
      "«Живём» — постоянное состояние → Present Simple. Подлежащее <b>we</b> (не третье лицо) → глагол простой, без -s: <b>live</b>.",
    rule: "<b>I/you/we/they + V</b> (без -s). -s добавляет только he/she/it.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>we</b> → глагол без -s → <b>live</b>.",
        bridge:
          "Проверка на -s: подлежащее he/she/it? Нет, это <b>we</b> → глагол остаётся простым: <b>live</b>. <b>We live in Moscow</b>.",
        rule: "we/you/they/I → глагол <b>без -s</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>we live</i>, <i>they work</i>, <i>you play</i> — без -s.",
        bridge:
          "Сравни: <i>she live<b>s</b></i> (третье лицо) ↔ <i>we <b>live</b></i> (множественное). Только he/she/it берут -s.",
        rule: "Множественное и «я/ты» → глагол без -s.",
      },
    },
  },
];

// ── have-got: что у тебя есть ───────────────────────────────────────────────
const HAVE_GOT: LessonItem[] = [
  {
    topic: "have-got",
    kind: "have-got",
    ru: "У меня есть машина.",
    correct: ["I", "have", "got", "a", "car"],
    bank: ["I", "have", "got", "a", "car", "has"],
    subject: "I",
    whyOk: "Верно! «У меня есть» = <b>I have got</b>. Связка have + got — обладание.",
    bridge:
      "В русском «у меня есть машина» — через «есть». В английском это <b>have got</b>: <i>I have got a car</i>. Для I/you/we/they — именно <b>have</b>.",
    rule: "Обладание: <b>I/you/we/they have got</b>, <b>he/she/it has got</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>I → have got</b>.",
        bridge:
          "Конструкция «у кого-то есть» = <b>have/has got</b>. Лицо I → <b>have</b>. Плюс «a car». <b>I have got a car</b>.",
        rule: "<b>have got</b> (I/you/we/they) / <b>has got</b> (he/she/it).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I have got a car</i>, <i>they have got a dog</i> — have got = есть.",
        bridge:
          "Ряд: <i>I <b>have got</b> a car</i> · <i>we <b>have got</b> time</i>. «У меня/нас есть» → <b>have got</b>.",
        rule: "«У меня есть …» → <b>I have got …</b>.",
      },
    },
  },
  {
    topic: "have-got",
    kind: "have-got",
    ru: "У неё голубые глаза.",
    correct: ["She", "has", "got", "blue", "eyes"],
    bank: ["She", "has", "got", "blue", "eyes", "have"],
    subject: "She",
    whyOk: "Верно! С <b>she/he/it</b> → <b>has got</b>: <b>She has got blue eyes</b>.",
    bridge:
      "Та же ловушка третьего лица: для he/she/it «иметь» — это <b>has got</b>, не have. «У неё есть» = <b>She has got</b>.",
    rule: "<b>he/she/it → has got</b> (не have got).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>She → has got</b>.",
        bridge:
          "Лицо she → форма <b>has</b> (третье лицо). <b>has got</b> + «blue eyes». Получаем <b>She has got blue eyes</b>.",
        rule: "he/she/it → <b>has got</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>she has got</i>, <i>he has got</i>, <i>it has got</i> — третье лицо → has.",
        bridge:
          "Сравни: <i>I <b>have</b> got</i> ↔ <i>she <b>has</b> got</i>. he/she/it меняют have на <b>has</b>.",
        rule: "Третье лицо → <b>has got</b>.",
      },
    },
  },
  {
    topic: "have-got",
    kind: "have-got",
    ru: "У них двое детей.",
    correct: ["They", "have", "got", "two", "children"],
    bank: ["They", "have", "got", "two", "children", "has", "childs"],
    subject: "They",
    whyOk: "Верно! <b>They have got</b> + множественное <b>children</b> (исключение).",
    bridge:
      "«У них есть» = <b>They have got</b> (множественное → have). И «дети» — особое множественное <b>children</b>, не childs.",
    rule: "<b>they have got</b>; child → children (исключение мн.числа).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: they → <b>have got</b>, child → <b>children</b>.",
        bridge:
          "Шаг 1: they (множеств.) → <b>have got</b>. Шаг 2: «дети» — исключение → <b>children</b>. Итог: <b>They have got two children</b>.",
        rule: "they → have got; неправильное мн.ч.: children.",
      },
      "examples-first": {
        whyOk: "Верно! <i>they have got</i> + <i>children</i> — множественное и форма-исключение.",
        bridge:
          "Ряд: <i>we <b>have got</b></i> · <i>they <b>have got</b></i>. И помни <i>child → <b>children</b></i>.",
        rule: "they/we → have got; child → children.",
      },
    },
  },
];

// ── possessives: притяжательные ─────────────────────────────────────────────
const POSSESSIVES: LessonItem[] = [
  {
    topic: "possessives",
    kind: "possessives",
    ru: "Это моя книга.",
    correct: ["This", "is", "my", "book"],
    bank: ["This", "is", "my", "book", "mine", "I"],
    subject: "This",
    whyOk: "Верно! Перед существительным — <b>my</b> (не mine): <b>my book</b>.",
    bridge:
      "<b>my</b> и <b>mine</b> оба «мой», но <b>my</b> стоит перед словом (<i>my book</i>), а <b>mine</b> — отдельно (<i>it is mine</i>). Раз дальше «book» — нужен <b>my</b>.",
    rule: "Перед существительным: <b>my, your, his, her, our, their</b>. my book.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>my</b> + существительное.",
        bridge:
          "Притяжательное перед предметом — это <b>my/your/his…</b>. Здесь «моя книга» → <b>my book</b>. <b>mine</b> было бы без «book».",
        rule: "<b>my</b> + сущ.; <b>mine</b> — без сущ.",
      },
      "examples-first": {
        whyOk: "Верно! <i>my book</i>, <i>my car</i>, <i>my friend</i> — <b>my</b> перед предметом.",
        bridge:
          "Сравни: <i>this is <b>my</b> book</i> ↔ <i>this book is <b>mine</b></i>. Есть слово после → <b>my</b>.",
        rule: "Есть существительное → <b>my</b>.",
      },
    },
  },
  {
    topic: "possessives",
    kind: "possessives",
    ru: "Её зовут Анна.",
    correct: ["Her", "name", "is", "Anna"],
    bank: ["Her", "name", "is", "Anna", "She", "His"],
    subject: "Her",
    whyOk: "Верно! «Её» (чьё имя) → <b>Her</b>: <b>Her name is Anna</b>.",
    bridge:
      "В английском «её зовут» строят через «её имя есть»: <b>Her name is Anna</b>. «Её» (чья) — это <b>Her</b>, а <b>She</b> — это «она» (кто).",
    rule: "Притяжательные: his (его), <b>her</b> (её), its, our, their.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: чьё имя → <b>her</b> name.",
        bridge:
          "«Её имя» = <b>her name</b> (her — притяжательное). Дальше «is Anna». <b>Her name is Anna</b>. <b>She</b> сюда не подходит — это «она сама».",
        rule: "«её» (чья) → <b>her</b>; «она» (кто) → she.",
      },
      "examples-first": {
        whyOk: "Верно! <i>her name</i>, <i>her book</i>, <i>her idea</i> — <b>her</b> = её.",
        bridge:
          "Сравни: <i><b>She</b> is Anna</i> (она — Анна) ↔ <i><b>Her</b> name is Anna</i> (её имя — Анна). «Чьё имя» → <b>her</b>.",
        rule: "«Её что-то» → <b>her</b> + предмет.",
      },
    },
  },
  {
    topic: "possessives",
    kind: "possessives",
    ru: "Наш дом большой.",
    correct: ["Our", "house", "is", "big"],
    bank: ["Our", "house", "is", "big", "We", "Ours"],
    subject: "Our",
    whyOk: "Верно! «Наш» перед существительным → <b>Our</b>: <b>Our house</b>.",
    bridge:
      "«Наш» = <b>Our</b> (перед предметом). <b>We</b> — это «мы» (кто), <b>Ours</b> — «наше» отдельно. Раз дальше «house» — нужен <b>Our</b>.",
    rule: "<b>our</b> + существительное = наш …. our house, our city.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>our</b> + house.",
        bridge:
          "Притяжательное «наш» перед предметом — <b>our</b>. <b>Our house</b> + «is big». Не We (мы) и не Ours (без предмета).",
        rule: "«наш» + сущ. → <b>our</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>our house</i>, <i>our team</i>, <i>our plan</i> — <b>our</b> перед предметом.",
        bridge:
          "Сравни: <i><b>We</b> are here</i> (мы) ↔ <i><b>Our</b> house</i> (наш дом). Перед предметом → <b>our</b>.",
        rule: "Есть существительное → <b>our</b>, не we.",
      },
    },
  },
];

// ── this-that: этот / тот ───────────────────────────────────────────────────
const THIS_THAT: LessonItem[] = [
  {
    topic: "this-that",
    kind: "this-that",
    ru: "Это ручка.",
    correct: ["This", "is", "a", "pen"],
    bank: ["This", "is", "a", "pen", "That", "These"],
    subject: "This",
    whyOk: "Верно! Про близкий предмет — <b>This</b>: <b>This is a pen</b>.",
    bridge:
      "<b>This</b> — для того, что рядом («этот, вот этот»). <b>That</b> — для далёкого («тот, вон тот»). Предмет тут под рукой → <b>This</b>.",
    rule: "<b>this</b> — близко (этот), <b>that</b> — далеко (тот). Ед.число.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: близкий предмет → <b>This</b>.",
        bridge:
          "Выбор this/that по расстоянию. Близко → <b>this</b>. Дальше «is a pen». <b>This is a pen</b>.",
        rule: "Близко и один → <b>this</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>this pen</i>, <i>this book</i> — про то, что рядом, <b>this</b>.",
        bridge:
          "Сравни: <i><b>this</b> (вот здесь)</i> ↔ <i><b>that</b> (вон там)</i>. Рядом → <b>this</b>.",
        rule: "Рядом → <b>this</b>.",
      },
    },
  },
  {
    topic: "this-that",
    kind: "this-that",
    ru: "То — моя машина.",
    correct: ["That", "is", "my", "car"],
    bank: ["That", "is", "my", "car", "This", "Those"],
    subject: "That",
    whyOk: "Верно! Про дальний предмет — <b>That</b>: <b>That is my car</b>.",
    bridge:
      "Предмет вдалеке («то, вон то») → <b>That</b>. Если бы рядом — было бы this. Раз «то» (не вот это) — <b>That</b>.",
    rule: "<b>that</b> — далеко (тот/то). Ед.число.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: дальний предмет → <b>That</b>.",
        bridge:
          "Расстояние: далеко → <b>that</b>. Дальше «is my car». <b>That is my car</b>.",
        rule: "Далеко и один → <b>that</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>that car</i>, <i>that house</i> — про далёкое, <b>that</b>.",
        bridge:
          "Сравни: <i><b>this</b> (рядом)</i> ↔ <i><b>that</b> (вдали)</i>. Далеко → <b>that</b>.",
        rule: "Вдали → <b>that</b>.",
      },
    },
  },
  {
    topic: "this-that",
    kind: "this-that",
    ru: "Это мои друзья.",
    correct: ["These", "are", "my", "friends"],
    bank: ["These", "are", "my", "friends", "This", "Those"],
    subject: "These",
    whyOk: "Верно! Несколько близких → <b>These</b> + are: <b>These are my friends</b>.",
    bridge:
      "<b>this</b> — один близкий, а <b>these</b> — несколько близких («эти»). Друзей много → <b>These</b>, и связка множественного → <b>are</b>.",
    rule: "Мн.число: <b>these</b> (эти, близко), <b>those</b> (те, далеко).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: много близких → <b>These</b> + are.",
        bridge:
          "this во множественном → <b>these</b>. Раз «друзья» много и рядом → <b>These</b>, связка <b>are</b>. <b>These are my friends</b>.",
        rule: "Мн.ч. близко → <b>these</b> + are.",
      },
      "examples-first": {
        whyOk: "Верно! <i>these friends</i>, <i>these books</i> — много рядом, <b>these</b>.",
        bridge:
          "Ряд: <i>this → <b>these</b></i> (близкие) · <i>that → those</i> (далёкие). Много рядом → <b>these</b>.",
        rule: "Несколько рядом → <b>these</b>.",
      },
    },
  },
];

// Реестр контента по теме. present-continuous — из items.ts (полная адаптивность,
// 3 концепции). Темы Юнитов 1–2 — здесь. AI-генерация пополняет реестр позже.
export const CONTENT_BY_TOPIC: Record<string, LessonItem[]> = {
  "present-continuous": ITEMS,
  // Юнит 1
  "to-be": TO_BE,
  pronouns: PRONOUNS,
  articles: ARTICLES,
  plurals: PLURALS,
  // Юнит 2
  "present-simple": PRESENT_SIMPLE,
  "have-got": HAVE_GOT,
  possessives: POSSESSIVES,
  "this-that": THIS_THAT,
  // Юнит 3
  "there-is": THERE_IS,
  "prepositions-place": PREPOSITIONS_PLACE,
  "can-cant": CAN_CANT,
  // Юнит 4
  "adverbs-frequency": ADVERBS_FREQUENCY,
  "like-ing": LIKE_ING,
  "numbers-time": NUMBERS_TIME,
  "wh-questions": WH_QUESTIONS,
  // A2 · Юнит 1 (Прошлое)
  "past-simple": PAST_SIMPLE,
  "past-irregular": PAST_IRREGULAR,
  "past-continuous": PAST_CONTINUOUS,
  "used-to": USED_TO,
  // A2 · Юнит 2 (Будущее)
  "future-will": FUTURE_WILL,
  "going-to": GOING_TO,
  "future-time": FUTURE_TIME,
  predictions: PREDICTIONS,
  // A2 · Юнит 3 (Сравнение и количество)
  comparatives: COMPARATIVES,
  superlatives: SUPERLATIVES,
  quantifiers: QUANTIFIERS,
  countable: COUNTABLE,
  // A2 · Юнит 4 (Опыт и советы)
  "present-perfect": PRESENT_PERFECT,
  "perfect-vs-past": PERFECT_VS_PAST,
  "modals-advice": MODALS_ADVICE,
  "adverbs-manner": ADVERBS_MANNER,
  // B1 · Юнит 1 (Условия и желания)
  "zero-conditional": ZERO_CONDITIONAL,
  "second-conditional": SECOND_CONDITIONAL,
  "wish-past": WISH_PAST,
  unless: UNLESS,
};

/** Айтемы темы для урока; нет темы → present-continuous (дефолт-витрина). */
export function itemsForTopic(topic: string | null | undefined): LessonItem[] {
  if (topic && CONTENT_BY_TOPIC[topic]?.length) return CONTENT_BY_TOPIC[topic];
  return ITEMS;
}
