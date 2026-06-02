// Контент B2 · Юнит 2 «Пассив продвинутый» (кураторский, см. content.ts).
// Темы: passive-modal, causative-have, passive-reporting, passive-gerund.

import type { LessonItem } from "./items";

// ── Пассив с модальными: modal + be + V3 ────────────────────────────────────
export const PASSIVE_MODAL: LessonItem[] = [
  {
    topic: "passive-modal",
    kind: "passive-modal",
    ru: "Это нужно сделать.",
    correct: ["This", "must", "be", "done"],
    bank: ["This", "must", "be", "done", "do", "is"],
    subject: "This",
    whyOk: "Верно! Модальный + пассив → <b>must + be + 3-я форма</b>: <b>must be done</b>.",
    bridge:
      "Пассив с модальным глаголом: <b>модальный + be + V3</b>. «Нужно сделать» (кем-то) = <b>must be done</b>. Глагол do → done.",
    rule: "<b>modal + be + V3</b>: must be done, can be made, should be sent.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: must + be + done.",
        bridge:
          "Схема: <b>must + be + V3</b>. do → done. <b>This must be done</b>.",
        rule: "modal + <b>be + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>must be done</i>, <i>can be fixed</i>, <i>should be sent</i> — modal + be + V3.",
        bridge:
          "Сравни: <i>somebody <b>must do</b> it</i> (актив) ↔ <i>it <b>must be done</b></i> (пассив).",
        rule: "Кем-то надо → modal + be + V3.",
      },
    },
  },
  {
    topic: "passive-modal",
    kind: "passive-modal",
    ru: "Дверь можно открыть.",
    correct: ["The", "door", "can", "be", "opened"],
    bank: ["The", "door", "can", "be", "opened", "open", "is"],
    subject: "door",
    whyOk: "Верно! <b>can + be + opened</b> — «можно открыть» (кем-то).",
    bridge:
      "«Можно открыть» в пассиве → <b>can be + V3</b>: <b>can be opened</b>. После модального — всегда be, затем 3-я форма.",
    rule: "<b>can be + V3</b> — возможность в пассиве.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: can + be + opened.",
        bridge:
          "can + be + opened (V3 от open). <b>The door can be opened</b>.",
        rule: "can + be + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>can be opened</i>, <i>can be seen</i>, <i>can be used</i>.",
        bridge:
          "Сравни: <i>you <b>can open</b> it</i> ↔ <i>it <b>can be opened</b></i>.",
        rule: "«Можно сделать» → can be + V3.",
      },
    },
  },
  {
    topic: "passive-modal",
    kind: "passive-modal",
    ru: "Работа должна быть закончена.",
    correct: ["The", "work", "should", "be", "finished"],
    bank: ["The", "work", "should", "be", "finished", "finish", "is"],
    subject: "work",
    whyOk: "Верно! <b>should + be + finished</b> — «должна быть закончена».",
    bridge:
      "Рекомендация в пассиве: <b>should be + V3</b>. «Должна быть закончена» = <b>should be finished</b>.",
    rule: "<b>should be + V3</b> — рекомендация/ожидание в пассиве.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: should + be + finished.",
        bridge:
          "should + be + finished (V3). <b>The work should be finished</b>.",
        rule: "should + be + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>should be finished</i>, <i>should be checked</i>, <i>should be done</i>.",
        bridge:
          "Сравни: <i>you <b>should finish</b> it</i> ↔ <i>it <b>should be finished</b></i>.",
        rule: "«Должно быть сделано» → should be + V3.",
      },
    },
  },
];

// ── Каузатив have/get: have something done ──────────────────────────────────
export const CAUSATIVE_HAVE: LessonItem[] = [
  {
    topic: "causative-have",
    kind: "causative-have",
    ru: "Мне починили машину.",
    correct: ["I", "had", "my", "car", "repaired"],
    bank: ["I", "had", "my", "car", "repaired", "repair", "have"],
    subject: "I",
    whyOk: "Верно! «Мне сделали» → <b>have + предмет + 3-я форма</b>: <b>had my car repaired</b>.",
    bridge:
      "Каузатив: когда что-то делают ДЛЯ тебя (не ты сам). Схема: <b>have + предмет + V3</b>. «Мне починили машину» = <b>I had my car repaired</b> (не «I repaired» — чинил не я).",
    rule: "<b>have + предмет + V3</b> — кто-то делает это для тебя.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had + my car + repaired.",
        bridge:
          "Схема каузатива: <b>have/had + предмет + V3</b>. <b>I had my car repaired</b> — машину чинил мастер.",
        rule: "have + предмет + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>had my car repaired</i>, <i>had the house painted</i> — сделали для меня.",
        bridge:
          "Сравни: <i>I <b>repaired</b> my car</i> (сам) ↔ <i>I <b>had</b> my car <b>repaired</b></i> (мастер).",
        rule: "«Мне сделали» → had + предмет + V3.",
      },
    },
  },
  {
    topic: "causative-have",
    kind: "causative-have",
    ru: "Она подстриглась.",
    correct: ["She", "had", "her", "hair", "cut"],
    bank: ["She", "had", "her", "hair", "cut", "cuts", "have"],
    subject: "She",
    whyOk: "Верно! «Ей подстригли» → <b>had her hair cut</b> (cut — 3-я форма cut).",
    bridge:
      "Парикмахер подстриг — для неё. Каузатив: <b>had + her hair + cut</b>. (cut неправильный: cut–cut–cut.)",
    rule: "<b>have/had + предмет + V3</b>. cut → cut (исключение).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had + her hair + cut.",
        bridge:
          "had + her hair + cut (V3). <b>She had her hair cut</b> — стригли её.",
        rule: "had + предмет + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>had her hair cut</i>, <i>had her nails done</i> — услуга для неё.",
        bridge:
          "Сравни: <i>she <b>cut</b> her hair</i> (сама) ↔ <i>she <b>had</b> her hair <b>cut</b></i> (мастер).",
        rule: "Услуга для тебя → had + предмет + V3.",
      },
    },
  },
  {
    topic: "causative-have",
    kind: "causative-have",
    ru: "Нам покрасили дом.",
    correct: ["We", "had", "our", "house", "painted"],
    bank: ["We", "had", "our", "house", "painted", "paint", "have"],
    subject: "We",
    whyOk: "Верно! «Нам покрасили» → <b>had our house painted</b>.",
    bridge:
      "Маляры покрасили — для нас. Каузатив: <b>had + our house + painted</b>. <b>We had our house painted</b>.",
    rule: "<b>had + предмет + V3</b> — сделано для нас.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: had + our house + painted.",
        bridge:
          "had + our house + painted (V3). <b>We had our house painted</b>.",
        rule: "had + предмет + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>had our house painted</i>, <i>had the car washed</i>.",
        bridge:
          "Сравни: <i>we <b>painted</b> the house</i> (сами) ↔ <i>we <b>had</b> it <b>painted</b></i> (маляры).",
        rule: "«Нам сделали» → had + предмет + V3.",
      },
    },
  },
];

// ── Пассив-репортинг: is said to / is believed to ───────────────────────────
export const PASSIVE_REPORTING: LessonItem[] = [
  {
    topic: "passive-reporting",
    kind: "passive-reporting",
    ru: "Говорят, что он богат.",
    correct: ["He", "is", "said", "to", "be", "rich"],
    bank: ["He", "is", "said", "to", "be", "rich", "says", "been"],
    subject: "He",
    whyOk: "Верно! «Говорят, что он…» → <b>He is said to be…</b>.",
    bridge:
      "Безличное «говорят/считают» оформляют как <b>подлежащее + is said/believed + to + инфинитив</b>: <b>He is said to be rich</b> (= говорят, что он богат).",
    rule: "<b>is said/believed/known to + V</b> — «говорят/считают, что…».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: He + is said + to be + rich.",
        bridge:
          "Схема: <b>подлежащее + is said + to + инфинитив</b>. <b>He is said to be rich</b>.",
        rule: "is said + to + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is said to be</i>, <i>is believed to be</i>, <i>is known to be</i>.",
        bridge:
          "Сравни: <i>people <b>say</b> he is rich</i> ↔ <i>he <b>is said to be</b> rich</i> (безлично, формально).",
        rule: "«Говорят, что X…» → X is said to + V.",
      },
    },
  },
  {
    topic: "passive-reporting",
    kind: "passive-reporting",
    ru: "Считается, что это полезно.",
    correct: ["It", "is", "believed", "to", "be", "useful"],
    bank: ["It", "is", "believed", "to", "be", "useful", "believes", "been"],
    subject: "It",
    whyOk: "Верно! «Считается, что…» → <b>is believed to be…</b>.",
    bridge:
      "«Считается/полагают» = <b>is believed to + инфинитив</b>: <b>It is believed to be useful</b>.",
    rule: "<b>is believed to + V</b> — «считается, что…».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: It + is believed + to be + useful.",
        bridge:
          "Схема: <b>It is believed to + V</b>. <b>It is believed to be useful</b>.",
        rule: "is believed + to + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is believed to be useful</i>, <i>is thought to be true</i>.",
        bridge:
          "Сравни: <i>people <b>believe</b> it is useful</i> ↔ <i>it <b>is believed to be</b> useful</i>.",
        rule: "«Считается, что…» → is believed to + V.",
      },
    },
  },
  {
    topic: "passive-reporting",
    kind: "passive-reporting",
    ru: "Известно, что она помогает.",
    correct: ["She", "is", "known", "to", "help"],
    bank: ["She", "is", "known", "to", "help", "knows", "helped"],
    subject: "She",
    whyOk: "Верно! «Известно, что она…» → <b>is known to + глагол</b>: <b>is known to help</b>.",
    bridge:
      "«Известно, что» = <b>is known to + инфинитив</b>. Здесь действие в настоящем → просто <b>to help</b>. <b>She is known to help</b>.",
    rule: "<b>is known to + V</b> — «известно, что…».",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: She + is known + to + help.",
        bridge:
          "Схема: <b>is known to + инфинитив</b>. <b>She is known to help</b>.",
        rule: "is known + to + V.",
      },
      "examples-first": {
        whyOk: "Верно! <i>is known to help</i>, <i>is known to work hard</i>.",
        bridge:
          "Сравни: <i>everyone <b>knows</b> she helps</i> ↔ <i>she <b>is known to</b> help</i>.",
        rule: "«Известно, что…» → is known to + V.",
      },
    },
  },
];

// ── Пассивный герундий: being done / having been done ───────────────────────
export const PASSIVE_GERUND: LessonItem[] = [
  {
    topic: "passive-gerund",
    kind: "passive-gerund",
    ru: "Ему нравится, когда его хвалят.",
    correct: ["He", "likes", "being", "praised"],
    bank: ["He", "likes", "being", "praised", "praise", "praises"],
    subject: "He",
    whyOk: "Верно! Пассивный герундий → <b>being + 3-я форма</b>: <b>being praised</b>.",
    bridge:
      "Когда действие направлено НА подлежащее после like/enjoy/hate, нужен пассивный герундий: <b>being + V3</b>. «Нравится, когда хвалят» = <b>likes being praised</b>.",
    rule: "<b>being + V3</b> — пассивный герундий (после like/enjoy/hate).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: likes + being + praised.",
        bridge:
          "Пассивный герундий: <b>being + V3</b>. like → likes being praised. <b>He likes being praised</b>.",
        rule: "<b>being + V3</b>.",
      },
      "examples-first": {
        whyOk: "Верно! <i>being praised</i>, <i>being noticed</i>, <i>being invited</i> — being + V3.",
        bridge:
          "Сравни: <i>he likes <b>praising</b></i> (он хвалит) ↔ <i>he likes <b>being praised</b></i> (его хвалят).",
        rule: "«Когда меня…» → being + V3.",
      },
    },
  },
  {
    topic: "passive-gerund",
    kind: "passive-gerund",
    ru: "Никто не любит, когда его критикуют.",
    correct: ["Nobody", "likes", "being", "criticized"],
    bank: ["Nobody", "likes", "being", "criticized", "criticize", "criticizes"],
    subject: "Nobody",
    whyOk: "Верно! «Когда критикуют» → пассивный герундий <b>being criticized</b>.",
    bridge:
      "«Не любит, когда его критикуют» — действие направлено на него: <b>being + V3</b> = <b>being criticized</b>.",
    rule: "<b>being + V3</b> после like/enjoy/hate (действие на тебя).",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: likes + being + criticized.",
        bridge:
          "being + criticized (V3). <b>Nobody likes being criticized</b>.",
        rule: "being + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>being criticized</i>, <i>being ignored</i>, <i>being told what to do</i>.",
        bridge:
          "Сравни: <i>nobody likes <b>criticizing</b></i> (критиковать) ↔ <i>nobody likes <b>being criticized</b></i> (быть раскритикованным).",
        rule: "«Когда меня критикуют» → being + V3.",
      },
    },
  },
  {
    topic: "passive-gerund",
    kind: "passive-gerund",
    ru: "Я помню, что меня пригласили.",
    correct: ["I", "remember", "being", "invited"],
    bank: ["I", "remember", "being", "invited", "invite", "invited"],
    subject: "I",
    whyOk: "Верно! «Помню, что меня пригласили» → <b>remember being invited</b>.",
    bridge:
      "После remember о прошлом опыте, когда действие было направлено на тебя: пассивный герундий <b>being + V3</b> = <b>being invited</b>.",
    rule: "<b>remember/recall + being + V3</b> — пассивный герундий о прошлом.",
    byConcept: {
      "rule-first": {
        whyOk: "Верно: remember + being + invited.",
        bridge:
          "being + invited (V3). <b>I remember being invited</b> — пригласили меня.",
        rule: "being + V3.",
      },
      "examples-first": {
        whyOk: "Верно! <i>remember being invited</i>, <i>remember being told</i>.",
        bridge:
          "Сравни: <i>I remember <b>inviting</b> him</i> (я пригласил) ↔ <i>I remember <b>being invited</b></i> (меня пригласили).",
        rule: "«Помню, что меня…» → being + V3.",
      },
    },
  },
];
