import { describe, expect, it } from "vitest";
import { createEmptyProfile } from "@/lib/store/types";
import { buildCourseSky } from "./sky";

describe("buildCourseSky", () => {
  it("maps curriculum sections to Lyra constellations", () => {
    const profile = createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
    const sky = buildCourseSky(profile);

    expect(sky.sections.map((s) => s.cefr)).toEqual(["A1", "A2", "B1", "B2"]);
    expect(sky.total).toBe(64);
    expect(sky.ready).toBe(52);
    expect(sky.sections[0].units).toHaveLength(4);
    expect(sky.sections[2].units[0].stars.map((s) => s.id)).toEqual([
      "zero-conditional",
      "second-conditional",
      "wish-past",
      "unless",
    ]);
    expect(sky.sections[2].units[1].stars.map((s) => s.id)).toEqual([
      "present-perfect-continuous",
      "past-perfect",
      "for-since",
      "just-already-yet",
    ]);
    expect(sky.sections[2].units[2].stars.map((s) => s.id)).toEqual([
      "passive-present",
      "passive-past",
      "reported-speech",
      "reported-questions",
    ]);
    expect(sky.sections[2].units[3].stars.map((s) => s.id)).toEqual([
      "gerund-infinitive",
      "relative-clauses",
      "modals-deduction",
      "so-such",
    ]);
  });

  it("marks the first unmastered ready topic as current and B1 tail as available", () => {
    const profile = createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
    const sky = buildCourseSky(profile);
    const a1First = sky.sections[0].units[0].stars[0];
    const b1Ready = sky.sections[2].units[1].stars[0];
    const b1Unit3Ready = sky.sections[2].units[2].stars[0];
    const b1Unit4Ready = sky.sections[2].units[3].stars[0];

    expect(a1First.state).toBe("current");
    expect(b1Ready.id).toBe("present-perfect-continuous");
    expect(b1Ready.state).toBe("available");
    expect(b1Ready.playable).toBe(true);
    expect(b1Unit3Ready.id).toBe("passive-present");
    expect(b1Unit3Ready.state).toBe("available");
    expect(b1Unit3Ready.playable).toBe(true);
    expect(b1Unit4Ready.id).toBe("gerund-infinitive");
    expect(b1Unit4Ready.state).toBe("available");
    expect(b1Unit4Ready.playable).toBe(true);
  });
});
