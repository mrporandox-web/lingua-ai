// Юнит-тесты движка диагностики (Блок A). Чистые функции над PlacementState:
// подбор вопроса под уровень, адаптивный шаг вверх/вниз, лимит вопросов,
// сведение прогона к CEFR + точности + слабым темам.

import { describe, expect, it } from "vitest";
import {
  LVL_ORDER,
  MAX_QUESTIONS,
  QUESTION_BANK,
  answerQuestion,
  finishPlacement,
  isPlacementDone,
  nextQuestion,
  startPlacement,
  type PlacementQuestion,
  type PlacementState,
} from "./engine";

const NOW = "2026-05-31T10:00:00.000Z";

/** Найти вопрос банка по id (хелпер фикстур). */
function q(id: string): PlacementQuestion {
  const found = QUESTION_BANK.find((x) => x.id === id);
  if (!found) throw new Error(`нет вопроса ${id}`);
  return found;
}

/** Прогнать список (вопрос, верно?) поверх старта (хелпер). */
function run(steps: Array<[PlacementQuestion, boolean]>): PlacementState {
  return steps.reduce(
    (s, [question, correct]) => answerQuestion(s, question, correct),
    startPlacement()
  );
}

describe("startPlacement / nextQuestion", () => {
  it("старт — указатель на A1, всё пусто", () => {
    const s = startPlacement();
    expect(s.lvlPtr).toBe(0);
    expect(s.asked).toEqual([]);
    expect(s.correct).toBe(0);
  });

  it("первый вопрос — с уровня A1", () => {
    const first = nextQuestion(startPlacement());
    expect(first?.lvl).toBe("A1");
  });

  it("не повторяет уже заданные вопросы", () => {
    const s = answerQuestion(startPlacement(), q("q-a1-tobe"), true);
    const nq = nextQuestion(s);
    expect(s.asked).toContain("q-a1-tobe");
    expect(nq?.id).not.toBe("q-a1-tobe");
  });

  it("если на целевом уровне пусто — берёт любой неотвеченный", () => {
    // отвечаем на оба A1-вопроса, остаёмся на A1-указателе вручную
    let s = answerQuestion(startPlacement(), q("q-a1-tobe"), false); // промах: lvlPtr остаётся 0
    s = answerQuestion(s, q("q-a1-articles"), false); // оба A1 заданы, lvlPtr=0
    const nq = nextQuestion(s);
    expect(nq).not.toBeNull();
    expect(s.asked).toHaveLength(2);
  });
});

describe("answerQuestion — адаптивный шаг", () => {
  it("верный ответ двигает уровень вверх", () => {
    const s = answerQuestion(startPlacement(), q("q-a1-tobe"), true);
    expect(s.lvlPtr).toBe(1); // A1 → A2
    expect(s.correct).toBe(1);
  });

  it("промах двигает уровень вниз и пишет слабую тему", () => {
    // сперва поднимемся до A2, потом промах вернёт на A1
    let s = answerQuestion(startPlacement(), q("q-a1-tobe"), true); // lvlPtr=1
    s = answerQuestion(s, q("q-a2-pastsimple"), false); // lvlPtr=0, weak+
    expect(s.lvlPtr).toBe(0);
    expect(s.weakTopics).toContain("past-simple");
  });

  it("не уходит ниже A1 на промахе с самого начала", () => {
    const s = answerQuestion(startPlacement(), q("q-a1-tobe"), false);
    expect(s.lvlPtr).toBe(0);
    expect(s.weakTopics).toContain("to-be");
  });

  it("не уходит выше потолка LVL_ORDER на серии верных", () => {
    const s = run([
      [q("q-a1-tobe"), true],
      [q("q-a2-pastsimple"), true],
      [q("q-b1-presentperfect"), true],
      [q("q-b2-passive"), true],
      [q("q-c1-inversion"), true],
      [q("q-c1-mixedcond"), true],
    ]);
    expect(s.lvlPtr).toBeLessThanOrEqual(LVL_ORDER.length - 1);
  });

  it("не мутирует исходный стейт (чистая функция)", () => {
    const s0 = startPlacement();
    const before = JSON.stringify(s0);
    answerQuestion(s0, q("q-a1-tobe"), true);
    expect(JSON.stringify(s0)).toBe(before);
  });
});

describe("isPlacementDone", () => {
  it("не завершено в начале", () => {
    expect(isPlacementDone(startPlacement())).toBe(false);
  });

  it("завершено после MAX_QUESTIONS ответов", () => {
    let s = startPlacement();
    for (let i = 0; i < MAX_QUESTIONS; i++) {
      const nq = nextQuestion(s);
      if (!nq) break;
      s = answerQuestion(s, nq, true);
    }
    expect(s.asked.length).toBeGreaterThanOrEqual(MAX_QUESTIONS);
    expect(isPlacementDone(s)).toBe(true);
  });
});

describe("finishPlacement", () => {
  it("уровень = где остановился указатель", () => {
    const s = run([
      [q("q-a1-tobe"), true], // → A2
      [q("q-a2-pastsimple"), true], // → B1
    ]);
    const r = finishPlacement(s, NOW);
    expect(r.cefrLevel).toBe("B1");
  });

  it("точность = % верных от заданных", () => {
    const s = run([
      [q("q-a1-tobe"), true],
      [q("q-a2-pastsimple"), false],
    ]);
    const r = finishPlacement(s, NOW);
    expect(r.grammarAccuracy).toBe(50); // 1 из 2
  });

  it("слабые темы — уникальные промахи, в формате WeakTopic", () => {
    let s = answerQuestion(startPlacement(), q("q-a1-tobe"), false); // weak: to-be
    s = answerQuestion(s, q("q-a1-articles"), false); // weak: articles
    const r = finishPlacement(s, NOW);
    expect(r.weakTopics.map((w) => w.topic).sort()).toEqual([
      "articles",
      "to-be",
    ]);
    expect(r.weakTopics[0]).toMatchObject({
      weight: 1,
      lastSeen: NOW,
      mastery: 0,
    });
  });

  it("пустой прогон — точность 0, уровень A1", () => {
    const r = finishPlacement(startPlacement(), NOW);
    expect(r.grammarAccuracy).toBe(0);
    expect(r.cefrLevel).toBe("A1");
    expect(r.weakTopics).toEqual([]);
  });
});
