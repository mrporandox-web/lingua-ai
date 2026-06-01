import { describe, expect, it } from "vitest";
import { CONTENT_BY_TOPIC, itemsForTopic } from "./content";
import { validateLessonItem } from "./validate";

describe("контент Юнита 1", () => {
  const entries = Object.entries(CONTENT_BY_TOPIC);

  it("у каждой темы есть айтемы", () => {
    for (const [topic, items] of entries) {
      expect(items.length, topic).toBeGreaterThan(0);
    }
  });

  it("каждый айтем проходит слой валидации", () => {
    for (const [topic, items] of entries) {
      for (const item of items) {
        const res = validateLessonItem(item);
        expect(res.ok, `${topic}: ${item.ru} → ${res.ok ? "" : res.reasons.join("; ")}`).toBe(true);
      }
    }
  });

  it("topic айтема совпадает с ключом реестра", () => {
    for (const [topic, items] of entries) {
      for (const item of items) expect(item.topic, item.ru).toBe(topic);
    }
  });

  it("itemsForTopic возвращает темы; неизвестная → present-continuous", () => {
    expect(itemsForTopic("to-be")[0].topic).toBe("to-be");
    expect(itemsForTopic("articles")[0].topic).toBe("articles");
    expect(itemsForTopic("present-perfect-continuous")[0].topic).toBe(
      "present-perfect-continuous"
    );
    expect(itemsForTopic("past-perfect")[0].topic).toBe("past-perfect");
    expect(itemsForTopic("for-since")[0].topic).toBe("for-since");
    expect(itemsForTopic("just-already-yet")[0].topic).toBe(
      "just-already-yet"
    );
    expect(itemsForTopic("нет-такой")[0].topic).toBe("present-continuous");
    expect(itemsForTopic(null)[0].topic).toBe("present-continuous");
  });
});
