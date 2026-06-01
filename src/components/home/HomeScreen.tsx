"use client";

// Стартовый экран Lingua-AI — приветствие и знакомство.
// • Новый юзер (имени нет) → «Давай познакомимся», поле имени → диагностика.
// • Вернувшийся (имя есть) → «С возвращением, {имя}» → продолжить.
// Имя сохраняется в профиль (облако/localStorage) сразу на старте.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LyraCard, LyraChip, LyraOrb, LyraShell } from "@/components/lyra";
import { APP_NAME, LANGUAGE_OPTIONS } from "@/lib/brand";
import {
  DEFAULT_LEARNING_GOAL,
  LEARNING_GOALS,
  type LearningGoalId,
  isLearningGoalId,
} from "@/lib/onboarding";
import { getProfileStore } from "@/lib/store";

type OnboardingStep = "language" | "goal";
const ONBOARDING_SAVE_TIMEOUT_MS = 1200;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function HomeScreen() {
  const router = useRouter();
  // undefined — ещё грузим; null — профиля нет; string|null — имя (или его нет)
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [goal, setGoal] = useState<string | null | undefined>(undefined);
  const [onboarded, setOnboarded] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<OnboardingStep>("language");
  const [selectedGoal, setSelectedGoal] =
    useState<LearningGoalId>(DEFAULT_LEARNING_GOAL);

  useEffect(() => {
    let alive = true;
    getProfileStore()
      .load()
      .then((p) => {
        if (!alive) return;
        setName(p?.name ?? null);
        setGoal(p?.goal ?? null);
        setOnboarded(!!p?.onboarded);
        if (p?.name) setInput(p.name);
        if (isLearningGoalId(p?.goal)) setSelectedGoal(p.goal);
      })
      .catch(() => alive && setName(null));
    return () => {
      alive = false;
    };
  }, []);

  function goToGoal() {
    setStep("goal");
  }

  // Сохранить имя + цель и начать диагностику. Оба поля помогают персонализации.
  async function finishOnboarding() {
    const clean = input.trim().slice(0, 40);
    const save = async () => {
      const store = getProfileStore();
      await store.getOrCreate();
      await store.patch({ name: clean || null, goal: selectedGoal });
    };
    const savePromise = save().catch(() => {
      /* офлайн/сбой — не блокируем вход, профиль досохранится позже */
    });
    await Promise.race([savePromise, wait(ONBOARDING_SAVE_TIMEOUT_MS)]);
    setGoal(selectedGoal);
    router.push("/diagnostics");
  }

  const known = typeof name === "string" && name.length > 0;
  const shouldAskGoal = step === "goal" || (known && !onboarded && goal === null);

  return (
    <LyraShell>
      <div className="lyra-onboarding">
        {!shouldAskGoal && (
          <div className="lyra-ob-hero">
            <LyraOrb size={118} />
            <div className="lyra-brand">{APP_NAME}</div>
            <p className="lyra-muted">
              AI-наставник по английскому, который запоминает, как тебе удобнее
              учиться.
            </p>
          </div>
        )}
        {shouldAskGoal ? (
          <section className="lyra-goal-step">
            <p className="lyra-step-counter">Шаг 2 из 4</p>
            <h1 className="lyra-title">Зачем тебе этот язык?</h1>
            <p className="lyra-muted">
              Lyra соберёт уроки именно под твою цель.
            </p>

            <div className="lyra-goal-list">
              {LEARNING_GOALS.map((item) => (
                <button
                  key={item.id}
                  className={`lyra-goal-option${
                    selectedGoal === item.id ? " selected" : ""
                  }`}
                  type="button"
                  onClick={() => setSelectedGoal(item.id)}
                >
                  <span>
                    <b>{item.title}</b>
                    <small>{item.subtitle}</small>
                  </span>
                  <span className="lyra-radio" aria-hidden />
                </button>
              ))}
            </div>

            <button className="lyra-btn primary" onClick={finishOnboarding}>
              Дальше →
            </button>
            <div className="lyra-step-dots" aria-hidden>
              <span />
              <span className="on" />
              <span />
              <span />
            </div>
          </section>
        ) : known ? (
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
              onKeyDown={(e) => e.key === "Enter" && goToGoal()}
              placeholder="Как тебя зовут?"
              maxLength={40}
              aria-label="Твоё имя"
            />
            <button className="lyra-btn primary" onClick={goToGoal}>
              Дальше →
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
