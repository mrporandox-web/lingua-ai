// Контент B1 · Юнит 1 «Условия и желания» (кураторский, см. content.ts).
// Темы: zero-conditional, second-conditional, wish-past, unless.

import type { LessonItem } from "./items";

// ── Zero Conditional: общие истины ──────────────────────────────────────────
export const ZERO_CONDITIONAL: LessonItem[] = [
  {
    topic: "zero-conditional",
    kind: "zero-conditional",
    ru: "Если нагреть лёд, он тает.",
    correct: ["If", "you", "heat", "ice", "it", "melts"],
    bank: ["If", "you", "heat", "ice", "it", "melts", "will", "melt"],
    subject: "it",
    whyOk: "Верно! Общая истина → обе части в present: <b>heat … melts</b> (без will).",
    bridge:
      "Zero Conditional — про законы и всегда-правдивое («если делаешь X, всегда происходит Y»). ОБЕ части в Present Simple, will не нужен: <b>If you heat ice, it melts</b>.",
    rule: "Общая истина: <b>if + present, … present</b> (без will). If you heat ice, it melts.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: if + present (<b>heat</b>), главная present (<b>melts</b>).",
        bridge:
          "Схема нулевого условия: <b>If + present, … present</b>. Никакого will — это всегда так. <b>If you heat ice, it melts</b>.",
        rule: "if + present → present (факт).",
      },
      "examples-first": {
        whyOk: "Верно! <i>If you heat ice, it melts</i>, <i>If you drop it, it breaks</i> — закон природы.",
        bridge:
          "Ряд: <i>If you mix blue and yellow, you <b>get</b> green</i>. Всегда-правда → обе части present.",
        rule: "Всегда-правда → present + present.",
      },
    },
  },
  {
    topic: "zero-conditional",
    kind: "zero-conditional",
    ru: "Если идёт дождь, дороги мокрые.",
    correct: ["If", "it", "rains", "the", "roads", "get", "wet"],
    bank: ["If", "it", "rains", "the", "roads", "get", "wet", "will", "got"],
    subject: "roads",
    whyOk: "Верно! Закономерность → present в обеих частях: <b>rains … get</b>.",
    bridge:
      "Регулярная закономерность («каждый раз когда») — это Zero Conditional: <b>if + present, present</b>. <b>If it rains, the roads get wet</b>.",
    rule: "Закономерность → <b>if + present, present</b>.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: rains → get (обе present).",
        bridge:
          "Каждый раз → нулевое условие: <b>if + present, present</b>. <b>If it rains, the roads get wet</b>.",
        rule: "Регулярно → present + present.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If it rains, roads get wet</i>, <i>If you don't eat, you feel hungry</i>.",
        bridge:
          "Образец: <i>If you <b>touch</b> fire, you <b>get</b> burned</i>. Закономерность → present.",
        rule: "«Каждый раз» → present + present.",
      },
    },
  },
  {
    topic: "zero-conditional",
    kind: "zero-conditional",
    ru: "Растения умирают без воды.",
    correct: ["Plants", "die", "if", "they", "don't", "get", "water"],
    bank: ["Plants", "die", "if", "they", "don't", "get", "water", "will", "died"],
    subject: "Plants",
    whyOk: "Верно! Главная часть может идти первой: <b>Plants die if they don't get water</b>.",
    bridge:
      "Порядок частей в условии свободный: можно начать с результата. Но обе части всё равно в present (общая истина): <b>Plants die if they don't get water</b>.",
    rule: "Можно: <b>результат (present) + if + present</b>. Запятая тогда не нужна.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: die … if … don't get (обе present).",
        bridge:
          "Результат впереди: <b>Plants die</b> + <b>if they don't get water</b>. Оба present. Истина не зависит от порядка.",
        rule: "Порядок свободный, но present + present.",
      },
      "examples-first": {
        whyOk: "Верно! <i>Plants die if they don't get water</i>, <i>People get sick if they don't sleep</i>.",
        bridge:
          "Образец: <i>Ice <b>melts</b> if you <b>heat</b> it</i>. Результат может быть первым.",
        rule: "Результат-present + if + present.",
      },
    },
  },
];

// ── Second Conditional: гипотеза ────────────────────────────────────────────
export const SECOND_CONDITIONAL: LessonItem[] = [
  {
    topic: "second-conditional",
    kind: "second-conditional",
    ru: "Если бы я был богат, я бы путешествовал.",
    correct: ["If", "I", "were", "rich", "I", "would", "travel"],
    bank: ["If", "I", "were", "rich", "I", "would", "travel", "am", "will"],
    subject: "I",
    whyOk: "Верно! Гипотеза → <b>if + past (were), … would + глагол</b>.",
    bridge:
      "Second Conditional — про нереальное/маловероятное («если бы»). После if — прошедшее (<b>were</b> для всех лиц), в главной — <b>would + глагол</b>. <b>If I were rich, I would travel</b>.",
    rule: "Гипотеза: <b>if + past, … would + V</b>. (if I were, I would…)",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: if + <b>were</b> (past), главная → <b>would travel</b>.",
        bridge:
          "Схема: <b>If + past, … would + глагол</b>. were rich → would travel. <b>If I were rich, I would travel</b>.",
        rule: "if + past → would + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If I were rich, I would travel</i>, <i>If I had time, I would help</i>.",
        bridge:
          "Сравни: <i>If it <b>rains</b>, I <b>will</b> stay</i> (реально) ↔ <i>If I <b>were</b> rich, I <b>would</b> travel</i> (гипотеза).",
        rule: "«Если бы» → if + past, would.",
      },
    },
  },
  {
    topic: "second-conditional",
    kind: "second-conditional",
    ru: "Если бы я знал ответ, я бы сказал тебе.",
    correct: ["If", "I", "knew", "the", "answer", "I", "would", "tell", "you"],
    bank: ["If", "I", "knew", "the", "answer", "I", "would", "tell", "you", "know", "will"],
    subject: "I",
    whyOk: "Верно! <b>knew</b> (past) + <b>would tell</b> — гипотеза.",
    bridge:
      "«Если бы знал» → прошедшее <b>knew</b> (хотя речь о настоящем), главная → <b>would tell</b>. Это про воображаемую ситуацию.",
    rule: "<b>if + past, would + V</b>. if I knew, I would tell.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: knew → <b>would tell</b>.",
        bridge:
          "Гипотеза: <b>if + past (knew), … would + tell</b>. <b>If I knew the answer, I would tell you</b>.",
        rule: "if + past → would + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>If I knew, I would tell</i>, <i>If I had it, I would give it</i>.",
        bridge:
          "Образец: <i>If I <b>spoke</b> French, I <b>would</b> live in Paris</i>. Воображаемое → past + would.",
        rule: "Воображаемое → past + would.",
      },
    },
  },
  {
    topic: "second-conditional",
    kind: "second-conditional",
    ru: "Что бы ты сделал, если бы выиграл?",
    correct: ["What", "would", "you", "do", "if", "you", "won"],
    bank: ["What", "would", "you", "do", "if", "you", "won", "will", "win"],
    subject: "you",
    whyOk: "Верно! Вопрос гипотезы → <b>would … do … if … won</b> (past).",
    bridge:
      "В вопросе second conditional главная часть с <b>would</b> идёт вперёд, а условие — с прошедшим: <b>What would you do if you won?</b>",
    rule: "Вопрос: <b>What would + you + V … if + past?</b>",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: would you do … if you <b>won</b>.",
        bridge:
          "Вопрос гипотезы: <b>Wh + would + кто + V … if + past</b>. <b>What would you do if you won?</b>",
        rule: "would … if + past (вопрос).",
      },
      "examples-first": {
        whyOk: "Верно! <i>What would you do if you won</i>, <i>Where would you go if you could</i>.",
        bridge:
          "Образец: <i>What <b>would</b> you say if she <b>asked</b>?</i>. would + if + past.",
        rule: "Гипотет. вопрос → would … if + past.",
      },
    },
  },
];

// ── I wish: сожаления ───────────────────────────────────────────────────────
export const WISH_PAST: LessonItem[] = [
  {
    topic: "wish-past",
    kind: "wish-past",
    ru: "Хотел бы я знать ответ.",
    correct: ["I", "wish", "I", "knew", "the", "answer"],
    bank: ["I", "wish", "I", "knew", "the", "answer", "know", "will"],
    subject: "I",
    whyOk: "Верно! Сожаление о настоящем → <b>wish + past</b>: <b>wish I knew</b>.",
    bridge:
      "<b>I wish</b> выражает сожаление «жаль, что не так». О настоящем используют прошедшее: <b>I wish I knew</b> (= жаль, что не знаю). По-русски «хотел бы / жаль».",
    rule: "Сожаление о настоящем: <b>wish + past</b>. I wish I knew / had / could.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: wish + <b>knew</b> (past).",
        bridge:
          "После <b>wish</b> о настоящем → прошедшее. wish I <b>knew</b>. <b>I wish I knew the answer</b>.",
        rule: "wish + past (о настоящем).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I wish I knew</i>, <i>I wish I had time</i>, <i>I wish I could fly</i>.",
        bridge:
          "Образец: <i>I wish I <b>were</b> taller</i> · <i>I wish I <b>spoke</b> French</i>. Сожаление → past.",
        rule: "«Жаль, что не…» → wish + past.",
      },
    },
  },
  {
    topic: "wish-past",
    kind: "wish-past",
    ru: "Жаль, что у меня нет машины.",
    correct: ["I", "wish", "I", "had", "a", "car"],
    bank: ["I", "wish", "I", "had", "a", "car", "have", "will"],
    subject: "I",
    whyOk: "Верно! «Жаль, что нет» → <b>wish I had</b> (past).",
    bridge:
      "«Жаль, что у меня нет машины» по-английски — через wish + прошедшее: <b>I wish I had a car</b> (буквально «хотел бы я иметь»).",
    rule: "<b>wish + had</b> — «жаль, что нет». I wish I had…",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: wish I <b>had</b> a car.",
        bridge:
          "wish о настоящем → past. have → had. <b>I wish I had a car</b>.",
        rule: "wish + had.",
      },
      "examples-first": {
        whyOk: "Верно! <i>I wish I had a car</i>, <i>I wish I had more money</i>.",
        bridge:
          "Образец: <i>I wish I <b>had</b> a dog</i>. «Жаль, что нет» → wish + had.",
        rule: "«Нет, а жаль» → wish + had.",
      },
    },
  },
  {
    topic: "wish-past",
    kind: "wish-past",
    ru: "Жаль, что она здесь не живёт.",
    correct: ["I", "wish", "she", "lived", "here"],
    bank: ["I", "wish", "she", "lived", "here", "lives", "live"],
    subject: "she",
    whyOk: "Верно! С she тоже past: <b>wish she lived</b> (не lives).",
    bridge:
      "После wish глагол в прошедшем даже для she — без -s настоящего: <b>wish she lived</b> (= жаль, что не живёт). <b>I wish she lived here</b>.",
    rule: "<b>wish + past</b> для всех лиц: I wish she lived / he knew.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: wish she <b>lived</b> (past).",
        bridge:
          "wish → past. live → lived (без -s). <b>I wish she lived here</b>.",
        rule: "wish + past (любое лицо).",
      },
      "examples-first": {
        whyOk: "Верно! <i>I wish she lived here</i>, <i>I wish he understood</i>.",
        bridge:
          "Сравни: <i>she <b>lives</b> there</i> (факт) ↔ <i>I wish she <b>lived</b> here</i> (сожаление).",
        rule: "Сожаление → past, без -s.",
      },
    },
  },
];

// ── unless: «если не» ───────────────────────────────────────────────────────
export const UNLESS: LessonItem[] = [
  {
    topic: "unless",
    kind: "unless",
    ru: "Я не пойду, если ты не пойдёшь.",
    correct: ["I", "won't", "go", "unless", "you", "go"],
    bank: ["I", "won't", "go", "unless", "you", "go", "if", "don't"],
    subject: "I",
    whyOk: "Верно! <b>unless</b> = «если не», поэтому второе «не» не нужно: <b>unless you go</b>.",
    bridge:
      "<b>unless</b> уже содержит «не» («если НЕ»). Поэтому после него глагол БЕЗ отрицания: <b>unless you go</b> (= если ты не пойдёшь). <b>I won't go unless you go</b>.",
    rule: "<b>unless</b> = if not. После unless — глагол без «not».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: unless + <b>you go</b> (без not).",
        bridge:
          "unless = «если не», отрицание уже внутри. unless you go (не «unless you don't go»). <b>I won't go unless you go</b>.",
        rule: "unless + утвердительный глагол.",
      },
      "examples-first": {
        whyOk: "Верно! <i>unless you go</i>, <i>unless it rains</i> — без второго «not».",
        bridge:
          "Сравни: <i>if you <b>don't</b> go</i> = <i><b>unless</b> you go</i>. Одно и то же, но unless короче.",
        rule: "if not = <b>unless</b> + утв.",
      },
    },
  },
  {
    topic: "unless",
    kind: "unless",
    ru: "Ты опоздаешь, если не поторопишься.",
    correct: ["You", "will", "be", "late", "unless", "you", "hurry"],
    bank: ["You", "will", "be", "late", "unless", "you", "hurry", "if", "don't"],
    subject: "You",
    whyOk: "Верно! <b>unless you hurry</b> = «если не поторопишься».",
    bridge:
      "Главная часть с будущим (<b>will be late</b>), условие через <b>unless</b> + present без отрицания: <b>unless you hurry</b>. <b>You will be late unless you hurry</b>.",
    rule: "<b>… will …, unless + present</b>. unless you hurry / call / ask.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: will be late, <b>unless</b> you hurry.",
        bridge:
          "Будущее в главной + <b>unless + present</b> в условии. <b>You will be late unless you hurry</b>.",
        rule: "will …, unless + present.",
      },
      "examples-first": {
        whyOk: "Верно! <i>unless you hurry</i>, <i>unless we leave now</i>.",
        bridge:
          "Образец: <i>You'll fail <b>unless</b> you study</i>. unless = «если не».",
        rule: "«Если не» → unless + present.",
      },
    },
  },
  {
    topic: "unless",
    kind: "unless",
    ru: "Не звони мне, если это не срочно.",
    correct: ["Don't", "call", "me", "unless", "it's", "urgent"],
    bank: ["Don't", "call", "me", "unless", "it's", "urgent", "if", "isn't"],
    subject: "it",
    whyOk: "Верно! <b>unless it's urgent</b> = «если это не срочно».",
    bridge:
      "Просьба-запрет (<b>Don't call me</b>) + условие через <b>unless</b>: «кроме случая когда срочно». После unless — утвердительно: <b>it's urgent</b>. <b>Don't call me unless it's urgent</b>.",
    rule: "<b>unless</b> = «кроме случая когда / если не». unless it's urgent.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: <b>unless</b> it's urgent.",
        bridge:
          "Запрет + исключение через <b>unless</b> + утв. <b>Don't call me unless it's urgent</b>.",
        rule: "unless + утв. (исключение).",
      },
      "examples-first": {
        whyOk: "Верно! <i>unless it's urgent</i>, <i>unless you're sure</i>.",
        bridge:
          "Образец: <i>Don't open it <b>unless</b> I say so</i>. unless = «если не / кроме как».",
        rule: "«Кроме как если» → unless.",
      },
    },
  },
];
