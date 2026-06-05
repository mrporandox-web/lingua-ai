// Юнит-тесты сервиса обучения — оркестратора Фазы 2 (Блоки C+D).
// Сам сервис сайд-эффектный (грузит/пишет профиль, шлёт события), поэтому
// подменяем зависимости через DI: фейковый ProfileStore (в памяти) + фейковый
// EventLog (копит вызовы). Фиксируем rnd/now, чтобы поведение было детерминированным.
// Проверяем именно СВЯЗКУ движков, а не их математику (она покрыта отдельно).

import { describe, expect, it } from "vitest";
import {
  startSession,
  submitAnswer,
  scoreRetention,
  markConceptRevealed,
  calibrateConcept,
} from "./session";
import { MIN_SESSIONS_TO_LOCK } from "@/lib/pedagogy";
import type { EventLog, LearningEvent } from "@/lib/store/eventLog";
import type { ProfileStore } from "@/lib/store/store";
import {
  ALL_CONCEPTS,
  createEmptyProfile,
  type UserProfile,
} from "@/lib/store/types";

const NOW = "2026-05-31T10:00:00.000Z";
const NEXT_DAY = "2026-06-01T10:00:00.000Z";

/** Фейковый стор: профиль живёт в памяти, save перетирает целиком. */
function fakeStore(initial?: UserProfile): ProfileStore & { current: UserProfile } {
  let profile = initial ?? createEmptyProfile("u-test", NOW);
  return {
    current: profile,
    async load() {
      return profile;
    },
    async save(p: UserProfile) {
      profile = p;
      this.current = p;
    },
    async patch(partial) {
      profile = { ...profile, ...partial, updatedAt: NOW };
      this.current = profile;
      return profile;
    },
    async clear() {
      profile = createEmptyProfile("u-test", NOW);
      this.current = profile;
    },
    async getOrCreate() {
      this.current = profile;
      return profile;
    },
  };
}

/** Фейковый логгер: копит все события, чтобы проверить факт проводки. */
function fakeEvents(): EventLog & { sent: LearningEvent[] } {
  const sent: LearningEvent[] = [];
  return {
    sent,
    async append(e: LearningEvent) {
      sent.push(e);
    },
  };
}

describe("startSession", () => {
  it("на чистом профиле выбирает концепцию из доступных (фаза разведки)", async () => {
    const store = fakeStore();
    const plan = await startSession("present-continuous", ALL_CONCEPTS, {
      store,
      rnd: () => 0,
      now: () => NOW,
    });
    expect(plan.topic).toBe("present-continuous");
    expect(ALL_CONCEPTS).toContain(plan.concept);
    expect(plan.profile.id).toBe("u-test");
  });

  it("уважает список доступных концепций (не предлагает то, чего нет)", async () => {
    const store = fakeStore();
    const plan = await startSession("articles", ["context-story"], {
      store,
      now: () => NOW,
    });
    expect(plan.concept).toBe("context-story");
  });
});

describe("submitAnswer", () => {
  it("делает тройную проводку: сигнал концепции + SRS + событие, и сохраняет профиль", async () => {
    const store = fakeStore();
    const events = fakeEvents();

    const res = await submitAnswer(
      {
        topic: "present-continuous",
        item: "pc-1",
        concept: "rule-first",
        correct: true,
        payload: { ms: 1200 },
      },
      { store, events, now: () => NOW }
    );

    // 1) сигнал концепции записан (accuracy подрос, n=1)
    expect(res.profile.conceptScores["rule-first"].n).toBe(1);
    expect(res.profile.conceptScores["rule-first"].accuracy).toBe(1);

    // 2) SRS-запись темы появилась и созрела на завтра (первый успешный повтор)
    const srs = res.profile.srsQueue.find((s) => s.item === "pc-1");
    expect(srs).toBeDefined();
    expect(srs?.reps).toBe(1);
    expect(srs?.lastConcept).toBe("rule-first");

    // 3) событие ушло в лог с payload
    expect(events.sent).toHaveLength(1);
    expect(events.sent[0]).toMatchObject({
      topic: "present-continuous",
      item: "pc-1",
      concept: "rule-first",
      correct: true,
      payload: { ms: 1200 },
    });

    // профиль сохранён в стор (не только возвращён)
    expect(store.current.srsQueue).toHaveLength(1);
  });

  it("промах сбрасывает SRS-серию (reps=0, повтор сегодня) и копит сигнал n=2", async () => {
    const store = fakeStore();
    const events = fakeEvents();
    const deps = { store, events, now: () => NOW };

    await submitAnswer(
      { topic: "t", item: "i-1", concept: "examples-first", correct: true },
      deps
    );
    const res = await submitAnswer(
      { topic: "t", item: "i-1", concept: "examples-first", correct: false },
      deps
    );

    expect(res.profile.conceptScores["examples-first"].n).toBe(2);
    const srs = res.profile.srsQueue.find((s) => s.item === "i-1");
    expect(srs?.reps).toBe(0); // серия сброшена промахом
    expect(events.sent).toHaveLength(2);
  });
});

describe("scoreRetention", () => {
  it("no-op, если айтем ещё не показывали", async () => {
    const store = fakeStore();
    const before = store.current.updatedAt;
    const res = await scoreRetention(
      { item: "never-seen", remembered: true },
      { store, now: () => NEXT_DAY }
    );
    // профиль не тронут (нет проводки)
    expect(res.updatedAt).toBe(before);
    expect(res.conceptScores["rule-first"].retentionD1).toBe(0);
  });

  it("no-op при возврате в тот же день (нет интервала забывания)", async () => {
    const store = fakeStore();
    const deps = { store, now: () => NOW };
    await submitAnswer(
      { topic: "t", item: "i-1", concept: "rule-first", correct: true },
      deps
    );
    const res = await scoreRetention({ item: "i-1", remembered: true }, deps);
    // retention не зачтён — тот же день
    expect(res.conceptScores["rule-first"].retentionD1).toBe(0);
    const srs = res.srsQueue.find((s) => s.item === "i-1");
    expect(srs?.retentionScored).toBe(false);
  });

  it("засчитывает удержание на следующий день по концепции прошлого показа", async () => {
    const store = fakeStore();
    // показали айтем сегодня концепцией context-story
    await submitAnswer(
      { topic: "t", item: "i-1", concept: "context-story", correct: true },
      { store, now: () => NOW }
    );
    // вернулись назавтра и вспомнили
    const res = await scoreRetention(
      { item: "i-1", remembered: true },
      { store, now: () => NEXT_DAY }
    );
    expect(res.conceptScores["context-story"].retentionD1).toBe(1);
    const srs = res.srsQueue.find((s) => s.item === "i-1");
    expect(srs?.retentionScored).toBe(true); // помечено как зачтённое
  });

  it("не двоит зачёт: повторный scoreRetention за тот же цикл — no-op", async () => {
    const store = fakeStore();
    await submitAnswer(
      { topic: "t", item: "i-1", concept: "rule-first", correct: true },
      { store, now: () => NOW }
    );
    const first = await scoreRetention(
      { item: "i-1", remembered: true },
      { store, now: () => NEXT_DAY }
    );
    const r1 = first.conceptScores["rule-first"].retentionD1;
    // второй зачёт «не вспомнил» не должен ничего менять (флаг уже стоит)
    const second = await scoreRetention(
      { item: "i-1", remembered: false },
      { store, now: () => NEXT_DAY }
    );
    expect(second.conceptScores["rule-first"].retentionD1).toBe(r1);
  });
});

describe("markConceptRevealed (вау-момент)", () => {
  it("ставит conceptRevealedAt на чистом профиле и сохраняет", async () => {
    const store = fakeStore();
    expect(store.current.conceptRevealedAt).toBeNull();
    const res = await markConceptRevealed({ store, now: () => NOW });
    expect(res.conceptRevealedAt).toBe(NOW);
    expect(store.current.conceptRevealedAt).toBe(NOW); // персистнуто
  });

  it("идемпотентно: повторный вызов не перетирает дату (показ раз за жизнь)", async () => {
    const store = fakeStore();
    await markConceptRevealed({ store, now: () => NOW });
    const res = await markConceptRevealed({ store, now: () => NEXT_DAY });
    expect(res.conceptRevealedAt).toBe(NOW); // осталась первая дата
  });
});

describe("calibrateConcept (онбординг: выбор подхода)", () => {
  it("закрепляет выбранную концепцию, ставит вау и onboarded", async () => {
    const store = fakeStore();
    const res = await calibrateConcept("examples-first", {
      store,
      now: () => NOW,
    });
    expect(res.preferredConcept).toBe("examples-first");
    expect(res.conceptScores["examples-first"].n).toBe(MIN_SESSIONS_TO_LOCK);
    expect(res.conceptRevealedAt).toBe(NOW);
    expect(res.onboarded).toBe(true);
  });

  it("выбор «прилипает»: первый ответ в уроке не обнуляет рабочую концепцию", async () => {
    const store = fakeStore();
    await calibrateConcept("contrast-native", { store, now: () => NOW });
    // даже неверный ответ другой концепцией не должен сбросить preferred:
    // у contrast-native n уже на пороге, у остальных < порога (не eligible).
    const res = await submitAnswer(
      { topic: "t", item: "i-1", concept: "rule-first", correct: false },
      { store, now: () => NOW }
    );
    expect(res.profile.preferredConcept).toBe("contrast-native");
  });
});
