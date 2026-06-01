// Контент Юнита 1 курса A1 (кураторский — «слой валидации = выверенный скелет»).
// Темы: to-be, pronouns, articles, plurals. Формат — sentence-builder, как у
// present-continuous. be/ing тут НЕ нужны (PC-специфика). Каждый айтем: плоские
// whyOk/bridge/rule (= contrast-native, наш сигнатурный «сравнение с русским»)
// + byConcept{rule-first, examples-first}; остальные концепции откатываются на
// плоские (explainFor). Все айтемы проходят validateLessonItem (см. content.test.ts).

import type { LessonItem } from "./items";
import { ITEMS } from "./items";

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

// Реестр контента по теме. present-continuous — из items.ts (полная адаптивность,
// 3 концепции). Новые темы Юнита 1 — здесь. AI-генерация пополняет реестр позже.
export const CONTENT_BY_TOPIC: Record<string, LessonItem[]> = {
  "present-continuous": ITEMS,
  "to-be": TO_BE,
  pronouns: PRONOUNS,
  articles: ARTICLES,
  plurals: PLURALS,
};

/** Айтемы темы для урока; нет темы → present-continuous (дефолт-витрина). */
export function itemsForTopic(topic: string | null | undefined): LessonItem[] {
  if (topic && CONTENT_BY_TOPIC[topic]?.length) return CONTENT_BY_TOPIC[topic];
  return ITEMS;
}
