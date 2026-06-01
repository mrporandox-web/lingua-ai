"use client";

// Стартовый экран Lingua-AI — приветствие и знакомство.
// • Новый юзер (имени нет) → «Давай познакомимся», поле имени → диагностика.
// • Вернувшийся (имя есть) → «С возвращением, {имя}» → продолжить.
// Имя сохраняется в профиль (облако/localStorage) сразу на старте.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Backdrop } from "@/components/Backdrop";
import { getProfileStore } from "@/lib/store";

const PITCH =
  "Персональный AI-репетитор, который запоминает, КАК ты учишься лучше — и ведёт именно так. Грамматику объясняем на русском.";

export function HomeScreen() {
  const router = useRouter();
  // undefined — ещё грузим; null — профиля нет; string|null — имя (или его нет)
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [onboarded, setOnboarded] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    let alive = true;
    getProfileStore()
      .load()
      .then((p) => {
        if (!alive) return;
        setName(p?.name ?? null);
        setOnboarded(!!p?.onboarded);
        if (p?.name) setInput(p.name);
      })
      .catch(() => alive && setName(null));
    return () => {
      alive = false;
    };
  }, []);

  // Сохранить имя и начать (диагностика). Имя необязательно — можно пропустить.
  async function start() {
    const clean = input.trim().slice(0, 40);
    try {
      const store = getProfileStore();
      await store.getOrCreate();
      await store.patch({ name: clean || null });
    } catch {
      /* офлайн/сбой — не блокируем вход, имя досохранится позже */
    }
    router.push("/diagnostics");
  }

  const known = typeof name === "string" && name.length > 0;

  return (
    <div className="phone">
      <Backdrop />
      <div className="app">
        <div className="chip" style={{ marginTop: "auto" }}>
          <span className="dot" /> AI-репетитор английского
        </div>

        {known ? (
          // ── Вернувшийся ученик ──
          <>
            <h1 className="task" style={{ fontSize: 30, marginBottom: "var(--s2)" }}>
              С возвращением, {name}! 👋
            </h1>
            <p className="hintline" style={{ fontSize: 15, marginBottom: "var(--s4)" }}>
              Продолжим? Я помню твой уровень и как тебе удобнее учиться.
            </p>
            <div style={{ marginTop: "auto" }}>
              <Link
                href={onboarded ? "/course" : "/diagnostics"}
                className="btn go ready"
                style={{ display: "block", textAlign: "center" }}
              >
                {onboarded ? "Продолжить учиться →" : "Пройти диагностику →"}
              </Link>
              <Link href="/profile" className="homeLink">
                Мой профиль
              </Link>
            </div>
          </>
        ) : (
          // ── Новый ученик: знакомство ──
          <>
            <h1 className="task" style={{ fontSize: 30, marginBottom: "var(--s2)" }}>
              Привет! Давай познакомимся 👋
            </h1>
            <p className="hintline" style={{ fontSize: 15, marginBottom: "var(--s3)" }}>
              {PITCH}
            </p>
            <div style={{ marginTop: "auto" }}>
              <input
                className="nameInput"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && start()}
                placeholder="Как тебя зовут?"
                maxLength={40}
                aria-label="Твоё имя"
              />
              <button
                className="btn go ready"
                style={{ display: "block", width: "100%", marginTop: "var(--s2)" }}
                onClick={start}
              >
                {input.trim() ? "Поехали →" : "Пропустить и начать →"}
              </button>
              <Link href="/course" className="homeLink">
                Посмотреть программу курса
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
