"use client";

// Стартовый экран Lingua-AI — приветствие и знакомство.
// • Новый юзер (имени нет) → «Давай познакомимся», поле имени → диагностика.
// • Вернувшийся (имя есть) → «С возвращением, {имя}» → продолжить.
// Имя сохраняется в профиль (облако/localStorage) сразу на старте.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LyraCard, LyraChip, LyraOrb, LyraShell } from "@/components/lyra";
import { APP_NAME, LANGUAGE_OPTIONS, TARGET_LANGUAGE } from "@/lib/brand";
import { getProfileStore } from "@/lib/store";

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
    <LyraShell>
      <div className="lyra-onboarding">
        <div className="lyra-ob-hero">
          <LyraOrb size={118} />
          <div className="lyra-brand">{APP_NAME}</div>
          <p className="lyra-muted">
            AI-наставник по английскому, который запоминает, как тебе удобнее
            учиться.
          </p>
        </div>
        {known ? (
          <LyraCard className="lyra-ob-card">
            <LyraChip tone="gold">С возвращением</LyraChip>
            <h1 className="lyra-title">{name}, продолжим небо?</h1>
            <p className="lyra-muted">
              Я помню твой уровень, слабые темы и стиль подачи, который тебе
              подходит.
            </p>
            <Link
              href={onboarded ? "/course" : "/diagnostics"}
              className="lyra-btn primary"
            >
              {onboarded ? "Продолжить учиться" : "Пройти диагностику"}
            </Link>
            <Link href="/profile" className="lyra-link">
              Мой профиль
            </Link>
          </LyraCard>
        ) : (
          <LyraCard className="lyra-ob-card">
            <LyraChip tone="cool">Язык</LyraChip>
            <h1 className="lyra-title">Какой язык зажигаем?</h1>
            <div className="lyra-language-grid">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.id}
                  className="lyra-language selected"
                  type="button"
                >
                  <span>{lang.greeting}</span>
                  <small>
                    {lang.nameRu} · {lang.nameEn}
                  </small>
                </button>
              ))}
            </div>
            <input
              className="lyra-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && start()}
              placeholder="Как тебя зовут?"
              maxLength={40}
              aria-label="Твоё имя"
            />
            <button className="lyra-btn primary" onClick={start}>
              {input.trim()
                ? `Начать ${TARGET_LANGUAGE.nameRu.toLowerCase()}`
                : "Пропустить и начать"}
              </button>
            <Link href="/course" className="lyra-link">
              Посмотреть программу курса
            </Link>
          </LyraCard>
        )}
      </div>
    </LyraShell>
  );
}
