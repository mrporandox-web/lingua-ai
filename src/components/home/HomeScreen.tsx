"use client";

// Стартовый экран Lingua-AI — приветствие и знакомство.
// • Новый юзер → язык → имя → цель → мягкий вход в диагностику.
// • Вернувшийся (имя есть) → «С возвращением, {имя}» → продолжить.
// Имя и цель сохраняются в профиль перед стартом диагностики.

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

type OnboardingStep = "language" | "name" | "goal" | "diagnostics";
const ONBOARDING_STEPS: OnboardingStep[] = [
  "language",
  "name",
  "goal",
  "diagnostics",
];

function StepDots({ step }: { step: OnboardingStep }) {
  const active = ONBOARDING_STEPS.indexOf(step);
  return (
    <div className="lyra-step-dots" aria-hidden>
      {ONBOARDING_STEPS.map((item, index) => (
        <span className={index === active ? "on" : ""} key={item} />
      ))}
    </div>
  );
}

export function HomeScreen() {
  const router = useRouter();
  // undefined — ещё грузим; null — профиля нет; string|null — имя (или его нет)
  const [name, setName] = useState<string | null | undefined>(undefined);
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
        setOnboarded(!!p?.onboarded);
        if (p?.name) setInput(p.name);
        if (isLearningGoalId(p?.goal)) setSelectedGoal(p.goal);
        if (!p?.onboarded) {
          if (p?.goal) setStep("diagnostics");
          else if (p?.name) setStep("goal");
        }
      })
      .catch(() => alive && setName(null));
    return () => {
      alive = false;
    };
  }, []);

  function goToGoal() {
    setStep("goal");
  }

  function goToDiagnosticsIntro() {
    setStep("diagnostics");
  }

  // Сохранить имя + цель и начать диагностику. Оба поля помогают персонализации.
  async function startDiagnostics() {
    const clean = input.trim().slice(0, 40);
    const save = async () => {
      const store = getProfileStore();
      await store.getOrCreate();
      await store.patch({ name: clean || null, goal: selectedGoal });
    };
    await save().catch(() => {
      /* офлайн/сбой — не блокируем вход, профиль досохранится позже */
    });
    setName(clean || null);
    router.push("/diagnostics");
  }

  const known = typeof name === "string" && name.length > 0;
  const selectedGoalItem =
    LEARNING_GOALS.find((item) => item.id === selectedGoal) ?? LEARNING_GOALS[0];

  return (
    <LyraShell>
      <div className="lyra-onboarding">
        {step === "language" && !onboarded && (
          <div className="lyra-ob-hero">
            <LyraOrb size={118} />
            <div className="lyra-brand">{APP_NAME}</div>
            <p className="lyra-muted">
              AI-наставник по английскому, который запоминает, как тебе удобнее
              учиться.
            </p>
          </div>
        )}
        {onboarded && known ? (
          <LyraCard className="lyra-ob-card">
            <LyraChip tone="gold">С возвращением</LyraChip>
            <h1 className="lyra-title">{name}, летим дальше?</h1>
            <p className="lyra-muted">
              Я помню твой уровень, слабые темы и стиль подачи, который тебе
              подходит.
            </p>
            <Link href="/course" className="lyra-btn primary">
              Продолжить учиться
            </Link>
            <Link href="/profile" className="lyra-link">
              Мой профиль
            </Link>
          </LyraCard>
        ) : step === "goal" ? (
          <section className="lyra-goal-step">
            <p className="lyra-step-counter">Шаг 3 из 4</p>
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

            <button className="lyra-btn primary" onClick={goToDiagnosticsIntro}>
              Дальше →
            </button>
            <StepDots step="goal" />
          </section>
        ) : step === "diagnostics" ? (
          <section className="lyra-goal-step">
            <p className="lyra-step-counter">Шаг 4 из 4</p>
            <h1 className="lyra-title">Сейчас определим уровень</h1>
            <p className="lyra-muted">
              Дадим несколько коротких вопросов и соберём стартовый курс под
              твой уровень и цель.
            </p>

            <div className="lyra-prep-list">
              <div className="lyra-prep-item">
                <span>Язык</span>
                <b>Английский</b>
              </div>
              <div className="lyra-prep-item">
                <span>Цель</span>
                <b>{selectedGoalItem.title}</b>
              </div>
              <div className="lyra-prep-item">
                <span>Формат</span>
                <b>6 быстрых вопросов</b>
              </div>
            </div>

            <button className="lyra-btn primary" onClick={startDiagnostics}>
              Начать диагностику →
            </button>
            <StepDots step="diagnostics" />
          </section>
        ) : step === "name" ? (
          <section className="lyra-goal-step">
            <p className="lyra-step-counter">Шаг 2 из 4</p>
            <h1 className="lyra-title">Как тебя зовут?</h1>
            <p className="lyra-muted">
              Буду обращаться по имени. Можно пропустить и добавить позже.
            </p>
            <input
              className="lyra-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToGoal()}
              placeholder="Твоё имя"
              maxLength={40}
              autoFocus
              aria-label="Твоё имя"
            />
            <button className="lyra-btn primary" onClick={goToGoal}>
              {input.trim() ? "Дальше →" : "Пропустить →"}
            </button>
            <StepDots step="name" />
          </section>
        ) : (
          <LyraCard className="lyra-ob-card">
            <p className="lyra-step-counter">Шаг 1 из 4</p>
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
            <button className="lyra-btn primary" onClick={() => setStep("name")}>
              Дальше →
            </button>
            <Link href="/course" className="lyra-link">
              Посмотреть программу курса
            </Link>
            <StepDots step="language" />
          </LyraCard>
        )}
      </div>
    </LyraShell>
  );
}
