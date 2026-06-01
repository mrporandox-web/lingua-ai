import { describe, expect, it } from "vitest";
import {
  APP_DESCRIPTION,
  APP_NAME,
  LANGUAGE_OPTIONS,
  TARGET_LANGUAGE,
} from "./brand";

describe("Lyra brand constants", () => {
  it("uses Lyra as the app brand", () => {
    expect(APP_NAME).toBe("Lyra");
    expect(APP_DESCRIPTION).toContain("AI-репетитор");
  });

  it("offers only English for now", () => {
    expect(TARGET_LANGUAGE).toEqual({
      id: "en",
      nameRu: "Английский",
      nameEn: "English",
      greeting: "Hello!",
    });
    expect(LANGUAGE_OPTIONS).toEqual([TARGET_LANGUAGE]);
  });
});
