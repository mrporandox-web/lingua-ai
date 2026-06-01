import { describe, expect, it } from "vitest";
import { createEmptyProfile } from "@/lib/store/types";
import { buildCourseSky } from "./sky";

describe("buildCourseSky", () => {
  it("maps curriculum sections to Lyra constellations", () => {
    const profile = createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
    const sky = buildCourseSky(profile);

    expect(sky.sections.map((s) => s.cefr)).toEqual(["A1", "A2", "B1"]);
    expect(sky.total).toBe(48);
    expect(sky.ready).toBe(36);
    expect(sky.sections[0].units).toHaveLength(4);
    expect(sky.sections[2].units[0].stars.map((s) => s.id)).toEqual([
      "zero-conditional",
      "second-conditional",
      "wish-past",
      "unless",
    ]);
  });

  it("marks the first unmastered ready topic as current and soon topics as soon", () => {
    const profile = createEmptyProfile("u1", "2026-06-01T00:00:00.000Z");
    const sky = buildCourseSky(profile);
    const a1First = sky.sections[0].units[0].stars[0];
    const b1Soon = sky.sections[2].units[1].stars[0];

    expect(a1First.state).toBe("current");
    expect(b1Soon.id).toBe("present-perfect-continuous");
    expect(b1Soon.state).toBe("soon");
    expect(b1Soon.playable).toBe(false);
  });
});
