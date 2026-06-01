"use client";

// Карта курса в визуальном языке Lyra. Данные и состояния остаются из
// curriculum/progress; меняется только представление: секции/юниты/темы
// становятся созвездиями и звёздами.

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LyraBottomNav,
  LyraCard,
  LyraChip,
  LyraOrb,
  LyraShell,
} from "@/components/lyra";
import { getProfileStore } from "@/lib/store";
import { createEmptyProfile, type UserProfile } from "@/lib/store/types";
import { buildCourseSky } from "./sky";

export function CourseScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    let alive = true;
    getProfileStore()
      .load()
      .then((p) => alive && setProfile(p ?? null))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const baseProfile = useMemo(
    () => profile ?? createEmptyProfile("anon", "1970-01-01T00:00:00.000Z"),
    [profile]
  );
  const sky = useMemo(() => buildCourseSky(baseProfile), [baseProfile]);
  const current = sky.sections
    .flatMap((s) => s.units)
    .flatMap((u) => u.stars)
    .find((s) => s.state === "current");

  return (
    <LyraShell withBottomNav={<LyraBottomNav />}>
      <div className="lyra-course-head">
        <div>
          <p className="lyra-eyebrow">Твоё небо</p>
          <h1 className="lyra-title">Курс английского</h1>
        </div>
        <LyraChip tone="gold">
          {sky.done}/{sky.total}
        </LyraChip>
      </div>

      <LyraCard className="lyra-reco">
        <div className="lyra-reco-top">
          <LyraOrb size={42} />
          <div>
            <p className="lyra-eyebrow gold">Lyra советует</p>
            <p className="lyra-muted">следующая звезда в твоём курсе</p>
          </div>
        </div>
        <h2>{current ? current.title : "Все готовые темы пройдены"}</h2>
        <p className="lyra-muted">
          {current ? current.blurb : "Можно повторить любую тему."}
        </p>
        {current && (
          <button
            className="lyra-btn primary"
            onClick={() => router.push(`/lesson?topic=${current.id}`)}
          >
            Зажечь звезду
          </button>
        )}
      </LyraCard>

      <p className="lyra-muted lyra-ready-note">
        Готово {sky.ready} из {sky.total} тем. Остальные появятся по мере
        наполнения.
      </p>

      {sky.sections.map((section) => (
        <section key={section.cefr} className="lyra-constellation">
          <div className="lyra-section-head">
            <p className="lyra-eyebrow">{section.cefr}</p>
            <h2>{section.title}</h2>
          </div>
          {section.units.map((unit) => (
            <LyraCard className="lyra-unit" key={unit.id}>
              <div className="lyra-unit-head">
                <div>
                  <h3>{unit.title}</h3>
                  <p>{unit.subtitle}</p>
                </div>
                <LyraChip tone="neutral">
                  {unit.done}/{unit.total}
                </LyraChip>
              </div>
              <div className="lyra-stars">
                {unit.stars.map((star) => (
                  <button
                    key={star.id}
                    className={`lyra-star-btn ${star.state}`}
                    disabled={!star.playable}
                    onClick={() =>
                      star.playable && router.push(`/lesson?topic=${star.id}`)
                    }
                  >
                    <span className="lyra-star-dot" />
                    <span>{star.title}</span>
                    <small>{star.state === "soon" ? "скоро" : star.blurb}</small>
                  </button>
                ))}
              </div>
            </LyraCard>
          ))}
        </section>
      ))}
    </LyraShell>
  );
}
