// Юнит-тесты движка разбора ошибки — главной фичи против Duolingo.
// explainStructured (блоки) + explainError (строка-fallback) — чистые функции:
// на вход массив слов ученика + эталонный айтем, на выход — разбор ИМЕННО его ошибки.
// Покрываем все 5 веток × оба жанра (present-continuous с be/ing и тема-агностичный
// без них), плюс граничные случаи и инварианты (никогда не падает, всегда даёт каркас).

import { describe, expect, it } from "vitest";
import {
  ITEMS,
  explainError,
  explainFor,
  explainStructured,
  itemKind,
  type ErrorBlock,
  type LessonItem,
} from "./items";

// === Фикстуры ===

// Эталонный present-continuous айтем (есть be + ing) — ветки 1–3 живут только тут.
const PC: LessonItem = {
  topic: "present-continuous",
  kind: "present-continuous",
  ru: "Она сейчас готовит ужин.",
  correct: ["She", "is", "cooking", "dinner", "now"],
  bank: ["cooking", "is", "She", "dinner", "now", "cooks"],
  be: "is",
  ing: { base: "cooks", form: "cooking" },
  subject: "She",
  whyOk: "ok",
  bridge: "bridge",
  rule: "rule",
  byConcept: {},
};

// PC с подлежащим "I" — для проверки русского ярлыка «я» vs «мы» в ветке 2.
const PC_I: LessonItem = {
  ...PC,
  ru: "Я читаю книгу прямо сейчас.",
  correct: ["I", "am", "reading", "a", "book"],
  bank: ["reading", "I", "book", "am", "a", "read"],
  be: "am",
  ing: { base: "read", form: "reading" },
  subject: "I",
};

// Тема-агностичный айтем (НЕТ be/ing) — гоняет ветки 4 и 5 без present-continuous-логики.
// Имитирует past-simple/articles, которые появятся при генерации Claude (Фаза 3).
const FLAT: LessonItem = {
  topic: "past-simple",
  kind: "past-simple",
  ru: "Вчера мы пошли в кино.",
  correct: ["We", "went", "to", "the", "cinema"],
  bank: ["went", "We", "to", "the", "cinema", "go"],
  subject: "We",
  whyOk: "ok",
  bridge: "bridge",
  rule: "rule",
  byConcept: {},
};

// Собрать весь html из блоков в одну строку — удобно искать ключевые слова.
function htmlOf(blocks: ErrorBlock[]): string {
  return blocks.map((b) => b.html).join(" | ");
}

// =====================================================================
// explainStructured — структурированный разбор (то, что реально рендерит UI)
// =====================================================================

describe("explainStructured — ветка 1: перепутал be по лицу", () => {
  it("She is → написал are: ловит лицо, советует привязку", () => {
    // got = эталон, но are вместо is
    const got = ["She", "are", "cooking", "dinner", "now"];
    const blocks = explainStructured(got, PC);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].label).toBe("Лицо");
    expect(blocks[0].tone).toBe("en");
    // в тексте — что нужен is, а не are (через kw-чипы)
    expect(blocks[0].html).toContain("is");
    expect(blocks[0].html).toContain("are");
    expect(blocks[0].html).toContain("She");
    // второй блок — мнемоника привязки лиц
    expect(blocks[1].label).toBe("Запомни");
    expect(blocks[1].tone).toBe("tip");
    expect(blocks[1].html).toContain("am");
  });

  it("I am → написал is: та же ветка для первого лица", () => {
    const got = ["I", "is", "reading", "a", "book"];
    const blocks = explainStructured(got, PC_I);
    expect(blocks[0].label).toBe("Лицо");
    expect(blocks[0].html).toContain("am");
    expect(blocks[0].html).toContain("is");
  });
});

describe("explainStructured — ветка 2: забыл be совсем", () => {
  it("She cooking (без is): русский → английский → вывод", () => {
    const got = ["She", "cooking", "dinner", "now"];
    const blocks = explainStructured(got, PC);
    expect(blocks).toHaveLength(3);
    expect(blocks[0].label).toBe("В русском");
    expect(blocks[0].tone).toBe("ru");
    expect(blocks[1].label).toBe("В английском");
    expect(blocks[1].tone).toBe("en");
    expect(blocks[1].html).toContain("is");
    expect(blocks[2].label).toBe("Вывод");
    expect(blocks[2].tone).toBe("tip");
    // ing-форма «повисает» без be
    expect(blocks[2].html).toContain("cooking");
  });

  it("подлежащее I → русский ярлык «я» (не «мы»)", () => {
    const got = ["I", "reading", "a", "book"];
    const blocks = explainStructured(got, PC_I);
    expect(blocks[0].html).toContain("я");
    expect(blocks[0].html).not.toContain("мы");
  });

  it("подлежащее не I → русский ярлык «мы»", () => {
    const got = ["She", "cooking", "dinner", "now"];
    const blocks = explainStructured(got, PC);
    expect(blocks[0].html).toContain("мы");
  });
});

describe("explainStructured — ветка 3: голый глагол вместо -ing", () => {
  it("She is cooks (base вместо ing): форма + зачем", () => {
    const got = ["She", "is", "cooks", "dinner", "now"];
    const blocks = explainStructured(got, PC);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].label).toBe("Форма");
    expect(blocks[0].tone).toBe("en");
    expect(blocks[0].html).toContain("cooking");
    expect(blocks[0].html).toContain("cooks");
    expect(blocks[0].html).toContain("-ing");
    expect(blocks[1].label).toBe("Зачем");
    expect(blocks[1].tone).toBe("tip");
  });
});

describe("explainStructured — ветка 4: слова верные, сбит порядок", () => {
  it("PC: верный набор → каркас с be/-ing", () => {
    // тот же набор слов, другой порядок
    const got = ["is", "She", "cooking", "now", "dinner"];
    const blocks = explainStructured(got, PC);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].label).toBe("Порядок");
    expect(blocks[1].label).toBe("Каркас");
    // для PC каркас показывает be и -ing
    expect(blocks[1].html).toContain("is");
    expect(blocks[1].html).toContain("-ing");
  });

  it("тема-агностичный (FLAT): верный набор → нейтральный каркас без be/-ing", () => {
    const got = ["went", "We", "to", "cinema", "the"];
    const blocks = explainStructured(got, FLAT);
    expect(blocks[0].label).toBe("Порядок");
    expect(blocks[1].label).toBe("Каркас");
    // нет present-continuous-каркаса — нейтральная подсказка
    expect(blocks[1].html).not.toContain("-ing");
    expect(blocks[1].html).toContain("собери");
  });
});

describe("explainStructured — ветка 5: лишнее / нехватка (общий случай)", () => {
  it("лишнее слово → блок «Лишнее» + каркас", () => {
    // добавил левое слово, набор уже не совпадает и не PC-специфичен
    const got = ["She", "is", "cooking", "dinner", "now", "today"];
    const blocks = explainStructured(got, PC);
    const labels = blocks.map((b) => b.label);
    expect(labels).toContain("Лишнее");
    expect(labels).toContain("Каркас");
    expect(htmlOf(blocks)).toContain("today");
  });

  it("нехватка слова → блок «Не хватает» + каркас", () => {
    const got = ["She", "is", "cooking", "dinner"]; // нет now
    const blocks = explainStructured(got, PC);
    const labels = blocks.map((b) => b.label);
    expect(labels).toContain("Не хватает");
    expect(labels).toContain("Каркас");
    expect(htmlOf(blocks)).toContain("now");
  });

  it("FLAT лишнее+нехватка: оба блока + нейтральный каркас (эталон целиком)", () => {
    const got = ["We", "go", "to", "the", "park"]; // go вместо went, park вместо cinema
    const blocks = explainStructured(got, FLAT);
    const labels = blocks.map((b) => b.label);
    expect(labels).toContain("Лишнее");
    expect(labels).toContain("Не хватает");
    // нейтральный каркас перечисляет эталон
    const frame = blocks[blocks.length - 1];
    expect(frame.label).toBe("Каркас");
    expect(frame.html).toContain("went");
    expect(frame.html).toContain("cinema");
  });
});

// =====================================================================
// Инварианты explainStructured — «никогда не падает, всегда осмысленно»
// =====================================================================

describe("explainStructured — инварианты", () => {
  it("пустой ответ по PC → ветка «забыл be» (be пропущен раньше всего)", () => {
    // got=[] → missing = весь эталон, включая be → срабатывает ветка 2, не падает.
    const blocks = explainStructured([], PC);
    expect(blocks.length).toBeGreaterThan(0);
    const labels = blocks.map((b) => b.label);
    expect(labels).toContain("В русском"); // характерная метка ветки 2
  });

  it("пустой ответ по FLAT (без be/ing) → ветка нехватки", () => {
    // нет be/ing → ветки 1–3 недоступны, пустой набор уходит в общий случай (ветка 5).
    const blocks = explainStructured([], FLAT);
    const labels = blocks.map((b) => b.label);
    expect(labels).toContain("Не хватает");
    expect(labels).toContain("Каркас");
  });

  it("каждый блок имеет icon, label, валидный tone и непустой html", () => {
    const cases: Array<[string[], LessonItem]> = [
      [["She", "are", "cooking", "dinner", "now"], PC], // ветка 1
      [["She", "cooking", "dinner", "now"], PC], // ветка 2
      [["She", "is", "cooks", "dinner", "now"], PC], // ветка 3
      [["is", "She", "cooking", "now", "dinner"], PC], // ветка 4
      [["She", "is", "cooking", "dinner", "now", "today"], PC], // ветка 5
      [["went", "We", "to", "cinema", "the"], FLAT], // ветка 4 flat
      [["We", "go", "to", "the", "park"], FLAT], // ветка 5 flat
    ];
    for (const [got, item] of cases) {
      const blocks = explainStructured(got, item);
      expect(blocks.length).toBeGreaterThan(0);
      for (const b of blocks) {
        expect(b.icon.length).toBeGreaterThan(0);
        expect(b.label.length).toBeGreaterThan(0);
        expect(["ru", "en", "tip"]).toContain(b.tone);
        expect(b.html.length).toBeGreaterThan(0);
      }
    }
  });

  it("FLAT-айтем НИКОГДА не уходит в be/ing-ветки (1–3)", () => {
    // любой ответ по FLAT попадает только в ветки 4/5 → метки оттуда
    const got = ["We", "is", "went", "to", "the", "cinema"]; // даже с «is» в наборе
    const blocks = explainStructured(got, FLAT);
    const labels = blocks.map((b) => b.label);
    expect(labels).not.toContain("Лицо");
    expect(labels).not.toContain("Форма");
    expect(labels).not.toContain("В русском");
  });
});

// =====================================================================
// explainError — строковый fallback (та же логика, должна совпадать по ветке)
// =====================================================================

describe("explainError — fallback-строка по тем же 5 веткам", () => {
  it("ветка 1 (be по лицу): упоминает нужный и неверный be", () => {
    const msg = explainError(["She", "are", "cooking", "dinner", "now"], PC);
    expect(msg).toContain("is");
    expect(msg).toContain("are");
    expect(msg).toContain("She");
  });

  it("ветка 2 (забыл be): говорит про вспомогательный глагол", () => {
    const msg = explainError(["She", "cooking", "dinner", "now"], PC);
    expect(msg).toContain("is");
    expect(msg).toContain("вспомогательный");
  });

  it("ветка 3 (голый глагол): требует -ing", () => {
    const msg = explainError(["She", "is", "cooks", "dinner", "now"], PC);
    expect(msg).toContain("-ing");
    expect(msg).toContain("cooking");
  });

  it("ветка 4 (порядок): говорит про порядок + каркас", () => {
    const msg = explainError(["is", "She", "cooking", "now", "dinner"], PC);
    expect(msg).toContain("порядок");
  });

  it("ветка 5 (лишнее/нехватка): перечисляет diff", () => {
    const msg = explainError(["She", "is", "cooking", "dinner"], PC);
    expect(msg).toContain("Не хватает");
    expect(msg).toContain("now");
  });

  it("FLAT порядок: каркас = эталон целиком, без be/-ing", () => {
    const msg = explainError(["went", "We", "to", "cinema", "the"], FLAT);
    expect(msg).toContain("порядок");
    expect(msg).toContain("We went to the cinema");
  });

  it("пустой ответ не падает и даёт строку", () => {
    const msg = explainError([], PC);
    expect(typeof msg).toBe("string");
    expect(msg.length).toBeGreaterThan(0);
  });
});

// =====================================================================
// Хелперы itemKind / explainFor + санити прод-данных ITEMS
// =====================================================================

describe("itemKind", () => {
  it("берёт явный kind", () => {
    expect(itemKind(PC)).toBe("present-continuous");
    expect(itemKind(FLAT)).toBe("past-simple");
  });

  it("legacy без kind → present-continuous", () => {
    const legacy = { ...PC };
    delete legacy.kind;
    expect(itemKind(legacy)).toBe("present-continuous");
  });
});

describe("explainFor", () => {
  it("есть концепция → её объяснение", () => {
    const item = ITEMS[0]; // present-continuous, есть rule-first
    const e = explainFor(item, "rule-first");
    expect(e).toBe(item.byConcept["rule-first"]);
  });

  it("нет концепции → плоский fallback (contrast-native)", () => {
    const e = explainFor(PC, "contrast-native"); // byConcept пуст
    expect(e.whyOk).toBe(PC.whyOk);
    expect(e.bridge).toBe(PC.bridge);
    expect(e.rule).toBe(PC.rule);
  });
});

describe("ITEMS — санити прод-данных урока", () => {
  it("каждый present-continuous айтем самосогласован", () => {
    for (const item of ITEMS) {
      // банк покрывает эталон (каждое верное слово есть в банке)
      for (const w of item.correct) {
        expect(item.bank).toContain(w);
      }
      // верный ответ ведёт в ветку «всё ок» — explainStructured на эталоне
      // не должен срабатывать как ошибка лица/формы (набор совпадает → ветка 4)
      const blocks = explainStructured(item.correct, item);
      // при совпадающем наборе всегда ветка 4 «Порядок»
      expect(blocks[0].label).toBe("Порядок");
      // PC-айтемы должны иметь be/ing для разбора
      if (itemKind(item) === "present-continuous") {
        expect(item.be).toBeDefined();
        expect(item.ing).toBeDefined();
      }
    }
  });
});
