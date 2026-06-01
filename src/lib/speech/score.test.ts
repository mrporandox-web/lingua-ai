import { describe, expect, it } from "vitest";
import { scoreSpeech } from "./score";

describe("scoreSpeech", () => {
  it("полное совпадение → 100%", () => {
    const r = scoreSpeech("I would like a coffee", "I would like a coffee");
    expect(r.percent).toBe(100);
    expect(r.words.every((w) => w.ok)).toBe(true);
  });

  it("игнорирует регистр и пунктуацию", () => {
    const r = scoreSpeech("How are you?", "how are YOU");
    expect(r.percent).toBe(100);
  });

  it("частичное совпадение размечает пропущенные слова", () => {
    const r = scoreSpeech("Where is the station", "where station");
    expect(r.percent).toBe(50); // 2 из 4
    expect(r.words.find((w) => w.word === "is")?.ok).toBe(false);
    expect(r.words.find((w) => w.word === "where")?.ok).toBe(true);
  });

  it("пустой ввод → 0%", () => {
    expect(scoreSpeech("hello world", "").percent).toBe(0);
  });
});
