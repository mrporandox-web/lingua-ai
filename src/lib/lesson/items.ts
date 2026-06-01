// Данные эталонного урока (Present Continuous) + динамический разбор ошибки.
// Портировано 1:1 из prototype/lesson.html. В Фазе 3 ITEMS будет генерить Claude.

import type { ConceptId } from "@/lib/store/types";

// Грамматический «жанр» айтема — определяет, какие поля обязательны и как
// устроен разбор ошибки. Расширяемо: каждая новая тема = новый kind + своя
// ветка в валидаторе/промпте/объяснялке. Старые PC-айтемы без kind считаем
// present-continuous (обратная совместимость).
export type LessonKind =
  | "present-continuous"
  | "past-simple"
  | "articles"
  | "to-be"
  | "pronouns"
  | "plurals"
  | "present-simple"
  | "have-got"
  | "possessives"
  | "this-that"
  | "there-is"
  | "prepositions-place"
  | "can-cant"
  | "adverbs-frequency"
  | "like-ing"
  | "numbers-time"
  | "wh-questions";

// Тройка объяснений ОДНОЙ темы в рамках одной концепции подачи.
// Ядро адаптивности (Фаза 2): один айтем держит несколько таких троек,
// движок педагогики выбирает, какую показать конкретному ученику.
export interface ConceptExplain {
  whyOk: string; // объяснение при верном ответе (HTML)
  bridge: string; // «ага!»-момент / разбор сути (HTML)
  rule: string; // сухая формула правила (HTML)
}

export interface LessonItem {
  topic: string; // тема для движка памяти, напр. "present-continuous"
  kind?: LessonKind; // грамматический жанр (нет → present-continuous, legacy)
  ru: string; // русское предложение для перевода
  correct: string[]; // эталонный порядок слов
  bank: string[]; // банк слов (с дистракторами)
  // be/ing — обязательны ТОЛЬКО для present-continuous; в past-simple/articles их нет.
  be?: "am" | "is" | "are"; // нужный вспомогательный be для лица (PC)
  ing?: { base: string; form: string }; // голый глагол vs -ing (PC)
  subject: string; // подлежащее
  // Варианты объяснения по концепциям подачи. contrast-native есть всегда
  // (дефолт-fallback), остальные — по мере написания/генерации.
  byConcept: Partial<Record<ConceptId, ConceptExplain>>;
  // Плоские поля — fallback (= contrast-native), для обратной совместимости.
  whyOk: string;
  bridge: string;
  rule: string;
}

/** Жанр айтема с дефолтом present-continuous (для legacy-айтемов без kind). */
export function itemKind(item: LessonItem): LessonKind {
  return item.kind ?? "present-continuous";
}

/** Достать объяснение под выбранный концепт, с откатом на плоский (contrast-native). */
export function explainFor(item: LessonItem, concept: ConceptId): ConceptExplain {
  return (
    item.byConcept[concept] ?? {
      whyOk: item.whyOk,
      bridge: item.bridge,
      rule: item.rule,
    }
  );
}

export const ITEMS: LessonItem[] = [
  {
    topic: "present-continuous",
    kind: "present-continuous",
    ru: "Я читаю книгу прямо сейчас.",
    correct: ["I", "am", "reading", "a", "book", "right", "now"],
    bank: ["reading", "I", "now", "book", "am", "a", "right", "read"],
    be: "am",
    ing: { base: "read", form: "reading" },
    subject: "I",
    whyOk:
      "Верно! <b>am + reading</b> (-ing) — действие идёт <b>в момент речи</b>. По-русски «читаю» без вспомогательного, в английском обязателен <b>am</b>.",
    bridge:
      "В русском «я <b>читаю</b>» — одно слово. В английском «сейчас читаю» = <b>два</b> слова: <b>am</b> (что происходит сейчас) + <b>reading</b> (что именно делаю). Без <b>am</b> фраза звучит как «вообще по жизни», а не «прямо сейчас».",
    rule:
      "Present Continuous (сейчас): <b>am/is/are + глагол-ing</b>. Сигналы: <i>right now, now, at the moment</i>.",
    byConcept: {
      "rule-first": {
        whyOk:
          "Верно — по формуле. <b>I → am</b>, глагол с <b>-ing</b>: <b>am reading</b>. Каркас сошёлся.",
        bridge:
          "Формула Present Continuous: <b>подлежащее + be + глагол-ing</b>. Здесь <b>I</b> → <b>am</b>, <b>read</b> → <b>reading</b>. Подставляешь в формулу — получаешь <b>I am reading</b>. Сигнал «right now» подтверждает, что время именно это.",
        rule:
          "<b>am/is/are + V-ing</b>. Выбор be по лицу: I→am, he/she/it→is, we/you/they→are.",
      },
      "examples-first": {
        whyOk:
          "Верно! Сравни: <i>I am reading</i>, <i>she is cooking</i>, <i>we are watching</i> — всюду <b>be + -ing</b>. Ты попал в тот же образец.",
        bridge:
          "Посмотри на ряд: <i>I <b>am</b> read<b>ing</b></i> · <i>he <b>is</b> work<b>ing</b></i> · <i>they <b>are</b> play<b>ing</b></i>. Замечаешь общее? Везде два кусочка: маленькое слово (am/is/are) + глагол с хвостом <b>-ing</b>. Это и есть «прямо сейчас». Твоя фраза — из этого же ряда.",
        rule:
          "Образец «сейчас»: <b>be + V-ing</b>. Выведи сам на примерах — be меняется по лицу, -ing постоянно.",
      },
      "context-story": {
        whyOk:
          "Верно! Друг пишет: «Чем занят?» — ты отвечаешь <i>I <b>am reading</b> a book right now</i>. Он сразу понимает: ты <b>в процессе</b>, не отвлекайся.",
        bridge:
          "Представь: вечер, тебе звонят. «Привет, ты свободен?» Ты не говоришь сухое «read» — ты говоришь, что <b>прямо сейчас</b> занят: <i>I <b>am reading</b></i>. Маленькое <b>am</b> здесь как сигнал «я в моменте, перезвони позже». Уберёшь <b>am</b> — и фраза звучит как «я вообще читаю книги», без «именно сейчас».",
        rule:
          "В живой речи «прямо сейчас» = <b>am/is/are + V-ing</b>. Это твой ответ на «What are you doing?».",
      },
    },
  },
  {
    topic: "present-continuous",
    kind: "present-continuous",
    ru: "Она сейчас готовит ужин.",
    correct: ["She", "is", "cooking", "dinner", "now"],
    bank: ["cooking", "is", "She", "dinner", "now", "cooks"],
    be: "is",
    ing: { base: "cooks", form: "cooking" },
    subject: "She",
    whyOk:
      "Верно! С <b>she/he/it</b> вспомогательный — <b>is</b> (не am/are). <b>is cooking</b> = готовит прямо сейчас.",
    bridge:
      "По-русски «она готовит» и «прямо сейчас», и «вообще умеет» — одинаково. В английском это <b>разные</b> фразы: <b>is cooking</b> = сейчас у плиты; <b>cooks</b> = умеет/делает по жизни. Раз в задании «сейчас» — берём <b>is + cooking</b>.",
    rule:
      "Для <b>he/she/it</b> → <b>is</b> + V-ing. Не путай с Present Simple (she cooks = вообще, по жизни).",
    byConcept: {
      "rule-first": {
        whyOk:
          "Верно по формуле. <b>She → is</b> (третье лицо ед.ч.), глагол <b>cook → cooking</b>: <b>is cooking</b>.",
        bridge:
          "Формула: <b>be + V-ing</b>. Шаг 1 — выбери be по лицу: <b>she</b> → <b>is</b>. Шаг 2 — добавь <b>-ing</b>: <b>cooking</b>. Собираешь: <b>She is cooking</b>. Если бы стоял Present Simple, было бы <b>cooks</b> — но сигнал «сейчас» включает Continuous.",
        rule:
          "<b>he/she/it + is + V-ing</b>. Третье лицо в Continuous берёт <b>is</b>, не am/are.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>he is working</i>, <i>she is cooking</i>, <i>it is raining</i> — после he/she/it всегда <b>is + -ing</b>. Тот же образец.",
        bridge:
          "Ряд с третьим лицом: <i>he <b>is</b> sleep<b>ing</b></i> · <i>she <b>is</b> cook<b>ing</b></i> · <i>it <b>is</b> work<b>ing</b></i>. Видишь — для he/she/it маленькое слово всегда <b>is</b>. Не am, не are. Твоя <b>she</b> идёт сюда же: <b>is cooking</b>.",
        rule:
          "Подмечай на примерах: he/she/it тянут за собой <b>is</b>, а глагол — с хвостом <b>-ing</b>.",
      },
      "context-story": {
        whyOk:
          "Верно! Заходишь на кухню, пахнет ужином: <i>She <b>is cooking</b> dinner now</i>. Видишь её у плиты <b>в этот момент</b> — потому <b>is cooking</b>, а не «умеет готовить».",
        bridge:
          "Сценка: ты звонишь домой, спрашиваешь «что там мама?». Ответ зависит от смысла. Если она <b>прямо сейчас</b> у плиты — <i>she <b>is cooking</b></i>. Если ты про «она вообще хорошо готовит» — это уже <i>she <b>cooks</b> well</i>. В задании слово «сейчас» — значит застали её за делом: <b>is cooking</b>.",
        rule:
          "«Застал за делом сейчас» → <b>is + V-ing</b>. «Умеет / по жизни» → V без is (cooks).",
      },
    },
  },
  {
    topic: "present-continuous",
    kind: "present-continuous",
    ru: "Мы смотрим фильм.",
    correct: ["We", "are", "watching", "a", "movie"],
    bank: ["are", "watching", "We", "movie", "a", "watch"],
    be: "are",
    ing: { base: "watch", form: "watching" },
    subject: "We",
    whyOk:
      "Верно! С <b>we/you/they</b> → <b>are</b>. <b>are watching</b> — процесс идёт сейчас.",
    bridge:
      "«Мы смотрим» по-русски — одно слово. В английском процесс «прямо сейчас» = <b>are</b> + <b>watching</b>. <b>are</b> — потому что <b>we</b> (мы/вы/они всегда берут are).",
    rule: "Для <b>we/you/they</b> → <b>are</b> + V-ing.",
    byConcept: {
      "rule-first": {
        whyOk:
          "Верно по формуле. <b>We → are</b>, глагол <b>watch → watching</b>: <b>are watching</b>.",
        bridge:
          "Формула: <b>be + V-ing</b>. Лицо <b>we</b> (как you/they) → be = <b>are</b>. Глагол с <b>-ing</b> → <b>watching</b>. Итог: <b>We are watching</b>. Та же схема, что и для I/she — меняется только форма be.",
        rule:
          "<b>we/you/they + are + V-ing</b>. Множественное и «ты/вы» берут <b>are</b>.",
      },
      "examples-first": {
        whyOk:
          "Верно! <i>we are watching</i>, <i>you are reading</i>, <i>they are running</i> — после we/you/they всегда <b>are + -ing</b>.",
        bridge:
          "Ряд: <i>we <b>are</b> watch<b>ing</b></i> · <i>you <b>are</b> learn<b>ing</b></i> · <i>they <b>are</b> talk<b>ing</b></i>. Закономерность: для «мы/вы/они» маленькое слово — всегда <b>are</b>. Глагол — с <b>-ing</b>. Твоё <b>we</b> ровно сюда.",
        rule:
          "На примерах видно: we/you/they → <b>are</b>, глагол неизменно с <b>-ing</b>.",
      },
      "context-story": {
        whyOk:
          "Верно! Вы с друзьями на диване, идут титры: <i>We <b>are watching</b> a movie</i>. Кто-то стучит в дверь — отвечаешь этой фразой: «мы тут <b>сейчас</b> смотрим».",
        bridge:
          "Картинка: вечер, попкорн, экран горит. Тебе пишут «вы чем заняты?». Ты не отвечаешь «watch» — это звучит как команда «смотри!». Ты говоришь, что вы <b>в процессе</b>: <i>we <b>are</b> watch<b>ing</b></i>. <b>are</b> — потому что «мы» (we/you/they всегда берут are), <b>-ing</b> — потому что прямо сейчас на экране.",
        rule:
          "«Мы сейчас в процессе» → <b>are + V-ing</b>. Для we/you/they маленькое слово — всегда <b>are</b>.",
      },
    },
  },
];

// Один смысловой блок разбора ошибки: иконка + ярлык слева, текст справа.
// Тон ярлыка: "ru" / "en" — цветовая привязка (русский ↔ английский), "tip" — вывод.
export interface ErrorBlock {
  icon: string;
  label: string;
  tone: "ru" | "en" | "tip";
  html: string; // короткая мысль (может содержать <span class="kw">…</span>)
}

// code-чип для ключевого слова внутри объяснения (моноширинная пилюля)
function kw(w: string): string {
  return `<span class="kw">${w}</span>`;
}

/**
 * СТРУКТУРИРОВАННЫЙ разбор твоей ошибки (фича против Duolingo).
 * Вместо сплошного абзаца — 2–3 коротких блока (русский → английский → вывод),
 * чтобы глазу было за что зацепиться. Под каждый тип ошибки — свой набор блоков.
 */
export function explainStructured(
  got: string[],
  item: LessonItem
): ErrorBlock[] {
  const correct = item.correct;
  const extra = got.filter((w) => !correct.includes(w));
  const missing = correct.filter((w) => !got.includes(w));
  const sameSet = extra.length === 0 && missing.length === 0;

  // be/ing-специфичные ветки (1–3) — только для present-continuous.
  // Для past-simple/articles be/ing отсутствуют → сразу к тема-агностичным
  // веткам (4: порядок, 5: лишнее/нехватка).
  const be = item.be;
  const ing = item.ing;
  const isPC = !!be && !!ing;

  // 1) перепутал форму be для лица (am/are вместо is и т.п.)
  const wrongBe = isPC
    ? extra.find((w) => ["am", "is", "are"].includes(w) && w !== be)
    : undefined;
  if (isPC && be && ing && wrongBe && missing.includes(be)) {
    return [
      {
        icon: "🎯",
        label: "Лицо",
        tone: "en",
        html: `С «${kw(item.subject)}» вспомогательный — ${kw(
          be
        )}, а не ${kw(wrongBe)}.`,
      },
      {
        icon: "🔗",
        label: "Запомни",
        tone: "tip",
        html: `Привязка жёсткая: ${kw("I")} → ${kw("am")}, ${kw(
          "he/she/it"
        )} → ${kw("is")}, ${kw("we/you/they")} → ${kw("are")}.`,
      },
    ];
  }

  // 2) забыл вспомогательный be совсем
  if (isPC && be && ing && missing.includes(be) && !got.includes(be)) {
    return [
      {
        icon: "🇷🇺",
        label: "В русском",
        tone: "ru",
        html: `«${item.subject === "I" ? "я" : "мы"} ${
          ing.base
        }» говорим без вспомогательного слова.`,
      },
      {
        icon: "🇬🇧",
        label: "В английском",
        tone: "en",
        html: `«прямо сейчас» нельзя без ${kw(be)}: ${kw(
          item.subject
        )} ${kw(be)} ${kw(ing.form)}.`,
      },
      {
        icon: "💡",
        label: "Вывод",
        tone: "tip",
        html: `Само ${kw(ing.form)} без ${kw(
          be
        )} «повисает» в воздухе.`,
      },
    ];
  }

  // 3) взял голый глагол вместо -ing (read вместо reading)
  if (isPC && ing && extra.includes(ing.base) && missing.includes(ing.form)) {
    return [
      {
        icon: "🎯",
        label: "Форма",
        tone: "en",
        html: `Нужна форма с ${kw("-ing")}: ${kw(ing.form)}, а не ${kw(
          ing.base
        )}.`,
      },
      {
        icon: "💡",
        label: "Зачем",
        tone: "tip",
        html: `${kw(
          "-ing"
        )} показывает, что действие идёт прямо сейчас, а не «вообще по жизни».`,
      },
    ];
  }

  // 4) слова верные — только порядок
  if (sameSet) {
    // Каркас показываем только для PC (be+ing); иначе нейтральный текст.
    const frame =
      isPC && be
        ? `кто → ${kw(be)} → действие${kw("-ing")} → остальное.`
        : `слова есть — собери их в правильном порядке.`;
    return [
      {
        icon: "🔀",
        label: "Порядок",
        tone: "en",
        html: `Слова все верные — сбит только порядок.`,
      },
      {
        icon: "🧱",
        label: "Каркас",
        tone: "tip",
        html: frame,
      },
    ];
  }

  // 5) общий случай (лишнее/пропущенное)
  const blocks: ErrorBlock[] = [];
  if (extra.length) {
    blocks.push({
      icon: "➖",
      label: "Лишнее",
      tone: "en",
      html: extra.map(kw).join(" "),
    });
  }
  if (missing.length) {
    blocks.push({
      icon: "➕",
      label: "Не хватает",
      tone: "en",
      html: missing.map(kw).join(" "),
    });
  }
  blocks.push({
    icon: "🧱",
    label: "Каркас",
    tone: "tip",
    html:
      isPC && be && ing
        ? `${kw(item.subject)} ${kw(be)} ${kw(ing.form)}…`
        : `${kw(item.subject)} → ${item.correct.map(kw).join(" ")}`,
  });
  return blocks;
}

/**
 * Динамический разбор ИМЕННО твоей ошибки (фича против Duolingo).
 * Не «лишнее/не хватает», а ПОЧЕМУ — под конкретный тип ошибки.
 * Возвращает HTML-строку. (Оставлен для fallback / совместимости.)
 */
export function explainError(got: string[], item: LessonItem): string {
  const correct = item.correct;
  const extra = got.filter((w) => !correct.includes(w)); // лишние слова
  const missing = correct.filter((w) => !got.includes(w)); // пропущенные
  const sameSet = extra.length === 0 && missing.length === 0;

  // be/ing-ветки работают только для present-continuous (поля могут отсутствовать).
  const be = item.be;
  const ing = item.ing;
  const isPC = !!be && !!ing;

  // 1) перепутал форму be для лица (am/are вместо is и т.п.) — проверяем ПЕРВЫМ
  const wrongBe = isPC
    ? extra.find((w) => ["am", "is", "are"].includes(w) && w !== be)
    : undefined;
  if (isPC && be && ing && wrongBe && missing.includes(be)) {
    return (
      `С «<b>${item.subject}</b>» нужен <b>${be}</b>, а не <b>${wrongBe}</b>. ` +
      `Привязка жёсткая: <b>I → am</b>, <b>he/she/it → is</b>, <b>we/you/they → are</b>.`
    );
  }
  // 2) забыл вспомогательный be (am/is/are) совсем
  if (isPC && be && ing && missing.includes(be) && !got.includes(be)) {
    return (
      `Не хватает слова <b>${be}</b> — это вспомогательный глагол. ` +
      `В английском «прямо сейчас» нельзя сказать без него: <b>${item.subject} ${be} ${ing.form}</b>. ` +
      `Само <b>${ing.form}</b> без <b>${be}</b> «повисает» в воздухе.`
    );
  }
  // 3) взял голый глагол вместо -ing (read вместо reading)
  if (isPC && ing && extra.includes(ing.base) && missing.includes(ing.form)) {
    return (
      `Тут нужна форма с <b>-ing</b>: <b>${ing.form}</b>, а не <b>${ing.base}</b>. ` +
      `<b>-ing</b> показывает, что действие <b>идёт прямо сейчас</b>, а не «вообще по жизни».`
    );
  }
  // 4) слова верные — только порядок
  if (sameSet) {
    const frame =
      isPC && be
        ? `Каркас фразы: <b>кто → ${be} → действие(-ing) → остальное</b>.`
        : `Каркас: <b>${item.correct.join(" ")}</b>.`;
    return `Слова все верные — сбит только <b>порядок</b>. ` + frame;
  }
  // 5) общий случай (лишнее/пропущенное)
  let msg = "";
  if (extra.length) msg += `Лишнее: <b>${extra.join(", ")}</b>. `;
  if (missing.length) msg += `Не хватает: <b>${missing.join(", ")}</b>. `;
  msg +=
    isPC && be && ing
      ? `Собери по каркасу: <b>${item.subject} ${be} ${ing.form}…</b>`
      : `Собери по каркасу: <b>${item.correct.join(" ")}</b>.`;
  return msg;
}
