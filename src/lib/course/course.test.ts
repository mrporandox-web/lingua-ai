import { describe, expect, it } from "vitest";
import { createEmptyProfile, type UserProfile } from "@/lib/store/types";
import {
  A1_UNITS,
  A1_TOPICS,
  orderedTopics,
  getTopic,
  getUnit,
} from "./curriculum";
import {
  topicStates,
  topicMastery,
  courseProgress,
  unitProgress,
  readyShare,
  MASTERY_DONE,
} from "./progress";

function profile(): UserProfile {
  return createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
}

function withMastery(topic: string, mastery: number): UserProfile {
  const p = profile();
  p.weakTopics = [{ topic, weight: 1, lastSeen: null, mastery }];
  return p;
}

describe("curriculum A1", () => {
  it("16 тем A1 в 4 юнитах; orderedTopics покрывает A1+A2+B1 = 48", () => {
    expect(A1_UNITS).toHaveLength(4);
    expect(A1_TOPICS).toHaveLength(16);
    expect(orderedTopics()).toHaveLength(48); // A1 + A2 + B1 (по 16)
  });

  it("каждый topicId юнита резолвится в тему", () => {
    for (const u of A1_UNITS) {
      for (const id of u.topicIds) expect(getTopic(id), id).toBeDefined();
    }
  });

  it("вся программа A1 готова — 16/16 ready-тем", () => {
    const ready = A1_TOPICS.filter((t) => t.status === "ready");
    expect(ready).toHaveLength(16);
    expect(A1_TOPICS.every((t) => t.status === "ready")).toBe(true);
  });

  it("getUnit возвращает юнит по id", () => {
    expect(getUnit("a1-basics")?.title).toBe("Первые шаги");
    expect(getUnit("нет")).toBeUndefined();
  });
});

describe("progress", () => {
  it("первая готовая — current, прочие готовые — available", () => {
    const st = topicStates(profile());
    expect(st.get("to-be")).toBe("current"); // первая в порядке
    expect(st.get("pronouns")).toBe("available");
    expect(st.get("present-simple")).toBe("available");
    expect(st.get("wh-questions")).toBe("available"); // теперь тоже готова
  });

  it("освоенная готовая тема становится done", () => {
    const st = topicStates(withMastery("to-be", 0.9));
    expect(st.get("to-be")).toBe("done");
    // следующая готовая становится current
    expect(st.get("pronouns")).toBe("current");
  });

  it("topicMastery читает weakTopics, клампит в 0..1", () => {
    expect(topicMastery(profile(), "to-be")).toBe(0);
    expect(topicMastery(withMastery("to-be", 0.5), "to-be")).toBe(0.5);
    expect(topicMastery(withMastery("to-be", 9), "to-be")).toBe(1);
  });

  it("courseProgress и unitProgress считают освоенные", () => {
    const p = withMastery("present-continuous", MASTERY_DONE);
    expect(courseProgress(p)).toEqual({ done: 1, total: 48 }); // A1+A2+B1 = 48 тем
    expect(unitProgress(p, "a1-now")).toEqual({ done: 1, total: 4 });
    expect(unitProgress(p, "a1-basics")).toEqual({ done: 0, total: 4 });
  });

  it("readyShare: 36 готовых из 48 (A1 + A2 + B1 Юнит 1)", () => {
    expect(readyShare()).toEqual({ ready: 36, total: 48 });
  });
});
