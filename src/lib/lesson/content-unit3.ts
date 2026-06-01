// Контент Юнита 3 курса A1 «Прямо сейчас» (кураторский, см. content.ts).
// Темы: there-is, prepositions-place, can-cant. present-continuous — в items.ts.
// Формат sentence-builder; be/ing НЕ задаём (PC-специфика). Каждый айтем проходит
// validateLessonItem (content.test.ts).

import type { LessonItem } from "./items";

// ── there is / there are: есть / находится ──────────────────────────────────
export const THERE_IS: LessonItem[] = [
  {
    topic: "there-is",
    kind: "there-is",
    ru: "Здесь есть книга.",
    correct: ["There", "is", "a", "book"],
    bank: ["There", "is", "a", "book", "are", "have"],
    subject: "There",
    whyOk: "Верно! «Есть/находится» (один предмет) → <b>There is</b>: <b>There is a book</b>.",
    bridge:
      "В русском «здесь есть книга» — через «есть». В английском для «имеется/находится» используют оборот <b>There is</b> (один предмет) — не «have». <b>There is a book</b>.",
    rule: "<b>There is</b> + один предмет, <b>There are</b> + много. Про наличие/расположение.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: один предмет → <b>There is</b>.",
        bridge:
          "Оборот наличия: <b>There is</b> (ед.ч.) / <b>There are</b> (мн.ч.). Книга одна → <b>There is a book</b>.",
        rule: "Один → <b>There is</b>; много → There are.",
      },
      "examples-first": {
        whyOk: "Верно! <i>there is a book</i>, <i>there is a problem</i> — один предмет, <b>there is</b>.",
        bridge:
          "Ряд: <i><b>There is</b> a cat</i> · <i><b>There is</b> a key</i>. «Имеется один» → <b>There is</b>.",
        rule: "«Имеется (один)» → <b>There is</b>.",
      },
    },
  },
  {
    topic: "there-is",
    kind: "there-is",
    ru: "В комнате два окна.",
    correct: ["There", "are", "two", "windows"],
    bank: ["There", "are", "two", "windows", "is", "window"],
    subject: "There",
    whyOk: "Верно! Много предметов → <b>There are</b> + множественное: <b>There are two windows</b>.",
    bridge:
      "Когда предметов несколько, оборот меняется на <b>There are</b>, и существительное во множественном: window → <b>windows</b>.",
    rule: "<b>There are</b> + множественное число. there are two windows.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: много → <b>There are</b> + windows.",
        bridge:
          "Число больше 1 → <b>There are</b>. И существительное во мн.ч.: <b>windows</b>. <b>There are two windows</b>.",
        rule: "Много → <b>There are</b> + сущ.-s.",
      },
      "examples-first": {
        whyOk: "Верно! <i>there are two windows</i>, <i>there are people</i> — много → <b>there are</b>.",
        bridge:
          "Сравни: <i><b>There is</b> a window</i> (одно) ↔ <i><b>There are</b> two windows</i> (несколько).",
        rule: "Несколько → <b>There are</b>.",
      },
    },
  },
  {
    topic: "there-is",
    kind: "there-is",
    ru: "На столе есть кофе.",
    correct: ["There", "is", "coffee"],
    bank: ["There", "is", "coffee", "are", "a"],
    subject: "There",
    whyOk: "Верно! Кофе неисчисляемый → <b>There is</b> без артикля «a»: <b>There is coffee</b>.",
    bridge:
      "Кофе нельзя посчитать «один-два», поэтому артикль «a» не нужен, а оборот — <b>There is</b> (как для одного). <b>There is coffee</b>.",
    rule: "Неисчисляемое (coffee, water) → <b>There is</b>, без a.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: неисчисляемое → <b>There is</b> без a.",
        bridge:
          "Coffee — масса, не штука → артикль a не ставим, оборот <b>There is</b>. <b>There is coffee</b>.",
        rule: "Неисчисляемое → <b>There is</b> (без a).",
      },
      "examples-first": {
        whyOk: "Верно! <i>there is coffee</i>, <i>there is water</i> — без a.",
        bridge:
          "Сравни: <i>there is <b>a</b> cup</i> (штука) ↔ <i>there is coffee</i> (масса, без a).",
        rule: "Жидкости/массы → <b>There is</b> без a.",
      },
    },
  },
];

// ── prepositions of place: предлоги места ───────────────────────────────────
export const PREPOSITIONS_PLACE: LessonItem[] = [
  {
    topic: "prepositions-place",
    kind: "prepositions-place",
    ru: "Кот под столом.",
    correct: ["The", "cat", "is", "under", "the", "table"],
    bank: ["The", "cat", "is", "under", "the", "table", "on", "in"],
    subject: "cat",
    whyOk: "Верно! «Под» → <b>under</b>: <b>under the table</b>.",
    bridge:
      "Предлоги места показывают, где предмет. «Под» = <b>under</b>, «на» = on, «в» = in. Кот снизу → <b>under the table</b>.",
    rule: "<b>under</b> — под, <b>on</b> — на (поверхности), <b>in</b> — внутри.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: «под» → <b>under</b>.",
        bridge:
          "Выбор предлога по положению. Снизу/под → <b>under</b>. <b>The cat is under the table</b>.",
        rule: "Под = <b>under</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>under the table</i>, <i>under the bed</i> — «под» это <b>under</b>.",
        bridge:
          "Сравни: <i><b>on</b> the table</i> (на) ↔ <i><b>under</b> the table</i> (под). Снизу → <b>under</b>.",
        rule: "Снизу → <b>under</b>.",
      },
    },
  },
  {
    topic: "prepositions-place",
    kind: "prepositions-place",
    ru: "Молоко в холодильнике.",
    correct: ["The", "milk", "is", "in", "the", "fridge"],
    bank: ["The", "milk", "is", "in", "the", "fridge", "on", "under"],
    subject: "milk",
    whyOk: "Верно! «Внутри» → <b>in</b>: <b>in the fridge</b>.",
    bridge:
      "Когда предмет внутри чего-то закрытого (холодильник, коробка, комната) — предлог <b>in</b>. <b>The milk is in the fridge</b>.",
    rule: "<b>in</b> — внутри (in the box, in the room).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: внутри → <b>in</b>.",
        bridge:
          "Положение «внутри» → предлог <b>in</b>. Молоко внутри холодильника → <b>in the fridge</b>.",
        rule: "Внутри → <b>in</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>in the fridge</i>, <i>in the box</i>, <i>in the room</i> — внутри → <b>in</b>.",
        bridge:
          "Сравни: <i><b>on</b> the fridge</i> (сверху) ↔ <i><b>in</b> the fridge</i> (внутри).",
        rule: "Внутри замкнутого → <b>in</b>.",
      },
    },
  },
  {
    topic: "prepositions-place",
    kind: "prepositions-place",
    ru: "Я на работе.",
    correct: ["I", "am", "at", "work"],
    bank: ["I", "am", "at", "work", "in", "on"],
    subject: "I",
    whyOk: "Верно! «На работе» (в точке/месте) → <b>at</b>: <b>at work</b>.",
    bridge:
      "<b>at</b> — для места как «точки» (at work, at school, at home). Не «in/on», а именно <b>at</b> для таких устойчивых мест.",
    rule: "<b>at</b> — в точке/у места: at work, at school, at the bus stop.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: место-точка → <b>at</b>.",
        bridge:
          "Устойчивые «at work / at school / at home» — место как точка пребывания → <b>at</b>. <b>I am at work</b>.",
        rule: "at work / at school / at home → <b>at</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>at work</i>, <i>at school</i>, <i>at home</i> — место-точка → <b>at</b>.",
        bridge:
          "Ряд: <i><b>at</b> work</i> · <i><b>at</b> the station</i>. «Нахожусь у/в точке» → <b>at</b>.",
        rule: "Точка пребывания → <b>at</b>.",
      },
    },
  },
];

// ── can / can't: умение и возможность ───────────────────────────────────────
export const CAN_CANT: LessonItem[] = [
  {
    topic: "can-cant",
    kind: "can-cant",
    ru: "Я умею плавать.",
    correct: ["I", "can", "swim"],
    bank: ["I", "can", "swim", "cans", "swims"],
    subject: "I",
    whyOk: "Верно! «Умею» → <b>can</b> + глагол без изменений: <b>I can swim</b>.",
    bridge:
      "<b>can</b> — «умею/могу». После can глагол идёт в простой форме, без -s и без to: <b>can swim</b>, не «cans» и не «can swims».",
    rule: "<b>can</b> + глагол (база). Одинаково для всех лиц: I/he/we can swim.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>can</b> + база swim.",
        bridge:
          "Модальный <b>can</b> не меняется по лицам и тянет глагол без окончаний: <b>can swim</b>. <b>I can swim</b>.",
        rule: "<b>can</b> + V (без -s, без to).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I can swim</i>, <i>he can swim</i> — can одинаков для всех.",
        bridge:
          "Ряд: <i>I <b>can</b> swim</i> · <i>she <b>can</b> swim</i> · <i>we <b>can</b> swim</i>. can не меняется.",
        rule: "<b>can</b> + простой глагол.",
      },
    },
  },
  {
    topic: "can-cant",
    kind: "can-cant",
    ru: "Она не умеет водить.",
    correct: ["She", "can't", "drive"],
    bank: ["She", "can't", "drive", "can", "drives"],
    subject: "She",
    whyOk: "Верно! «Не умеет» → <b>can't</b> + глагол: <b>She can't drive</b>.",
    bridge:
      "Отрицание «не могу/не умею» = <b>can't</b> (can + not). Глагол после — простой: <b>can't drive</b>. И для she тоже can't (модальный не берёт -s).",
    rule: "<b>can't</b> = can not. can't + глагол. Для всех лиц одинаково.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>can't</b> + drive.",
        bridge:
          "Отрицание модального: <b>can't</b>. Глагол без изменений → <b>drive</b>. <b>She can't drive</b> (не «can't drives»).",
        rule: "<b>can't</b> + V (база).",
      },
      "examples-first": {
        whyOk: "Верно! <i>she can't drive</i>, <i>I can't swim</i> — can't + простой глагол.",
        bridge:
          "Сравни: <i>she <b>can</b> drive</i> (умеет) ↔ <i>she <b>can't</b> drive</i> (не умеет). Глагол тот же.",
        rule: "Не умеет → <b>can't</b> + глагол.",
      },
    },
  },
  {
    topic: "can-cant",
    kind: "can-cant",
    ru: "Мы можем помочь.",
    correct: ["We", "can", "help"],
    bank: ["We", "can", "help", "cant", "helps"],
    subject: "We",
    whyOk: "Верно! «Можем» → <b>can</b> + помочь: <b>We can help</b>.",
    bridge:
      "<b>can</b> — это и «умею», и «могу/в состоянии». «Мы можем помочь» = <b>We can help</b>, глагол простой.",
    rule: "<b>can</b> = умею / могу. can + глагол.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>can</b> + help.",
        bridge:
          "Возможность → <b>can</b>. Глагол база → <b>help</b>. <b>We can help</b>.",
        rule: "Можем → <b>can</b> + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>we can help</i>, <i>you can come</i> — can + простой глагол.",
        bridge:
          "Ряд: <i>we <b>can</b> help</i> · <i>they <b>can</b> wait</i>. «В состоянии сделать» → <b>can</b>.",
        rule: "Возможность → <b>can</b>.",
      },
    },
  },
];
