"use client";

// Экран-карта программы (линейный путь A1). Показывает юниты и темы со
// статусом (освоено / доступно / закрыто / скоро), прогресс и вход в урок.
// Витрина того, что мы — программа, а не один демо-урок.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/Backdrop";
import { getProfileStore } from "@/lib/store";
import { createEmptyProfile, type UserProfile } from "@/lib/store/types";
import { A1_SECTION, A1_UNITS, getTopic } from "@/lib/course/curriculum";
import {
  topicStates,
  topicMastery,
  unitProgress,
  courseProgress,
  readyShare,
  isTopicPlayable,
  type TopicState,
} from "@/lib/course/progress";

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

  // Нет своего профиля (свежий заход) → считаем состояния от пустого:
  // present-continuous всё равно должна быть current (доступна), не soon.
  const baseProfile = useMemo(
    () => profile ?? createEmptyProfile("anon", "1970-01-01T00:00:00.000Z"),
    [profile]
  );
  const states = useMemo(() => topicStates(baseProfile), [baseProfile]);
  const done = courseProgress(baseProfile);
  const ready = readyShare();

  return (
    <div className="phone">
      <Backdrop />
      <div className="app">
        <div className="top">
          <Link href="/" className="x" aria-label="На главную">
            ‹
          </Link>
          <div className="chip" style={{ margin: 0 }}>
            <span className="dot" /> {A1_SECTION.title}
          </div>
        </div>

        {/* Прогресс курса */}
        <div className="courseHead">
          <div className="qmeta">Программа · {done.done}/{done.total} тем освоено</div>
          <div className="bar" style={{ marginBottom: 6 }}>
            <i style={{ width: `${(done.done / done.total) * 100}%` }} />
          </div>
          <div className="hintline" style={{ fontSize: 12 }}>
            Готово {ready.ready} из {ready.total} тем — остальные открываем по
            мере наполнения.
          </div>
        </div>

        {A1_UNITS.map((unit, ui) => {
            const up = unitProgress(baseProfile, unit.id);
            return (
              <div className="card" key={unit.id}>
                <div className="unitHead">
                  <div>
                    <div className="unitTitle">
                      {ui + 1}. {unit.title}
                    </div>
                    <div className="unitSub">{unit.subtitle}</div>
                  </div>
                  <div className="unitCount">
                    {up.done}/{up.total}
                  </div>
                </div>

                <div className="path">
                  {unit.topicIds.map((tid) => {
                    const topic = getTopic(tid);
                    if (!topic) return null;
                    const state: TopicState = states.get(tid) ?? "soon";
                    const mastery = topicMastery(baseProfile, tid);
                    const playable = isTopicPlayable(state);
                    return (
                      <button
                        key={tid}
                        className={`topicRow ${state}`}
                        disabled={!playable}
                        onClick={() =>
                          playable && router.push(`/lesson?topic=${tid}`)
                        }
                      >
                        <span className={`topicDot ${state}`}>
                          {iconFor(state)}
                        </span>
                        <span className="topicMain">
                          <span className="topicTitle">{topic.title}</span>
                          <span className="topicBlurb">
                            {state === "soon" ? "скоро" : topic.blurb}
                          </span>
                        </span>
                        {state === "done" && mastery > 0 && (
                          <span className="topicPct">
                            {Math.round(mastery * 100)}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function iconFor(state: TopicState): string {
  switch (state) {
    case "done":
      return "✓";
    case "current":
      return "▶";
    case "available":
      return "○";
    case "locked":
      return "🔒";
    default:
      return "•";
  }
}
