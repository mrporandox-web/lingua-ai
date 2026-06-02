"use client";

// Экран профиля ученика — витрина «движка памяти» (главный дифференциатор).
// Показывает то, что система уже знает про юзера: уровень CEFR, карту навыков,
// слабые темы, стрик и — ядро — КАКАЯ подача заходит лучше (preferredConcept)
// либо честный статус «копим сигнал, осталось N сессий».
// Только чтение профиля через ProfileStore + Lyra visual system.

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfileStore } from "@/lib/store";
import { learningGoalLabel } from "@/lib/onboarding";
import {
  ALL_CONCEPTS,
  type ConceptId,
  type Gamification,
  type Skills,
  type UserProfile,
} from "@/lib/store/types";
import { dailyProgress, dayKey } from "@/lib/gamification";
import {
  CONCEPT_LABEL,
  CONCEPT_HINT,
  conceptValue,
  topicLabel,
  MIN_SESSIONS_TO_LOCK,
} from "@/lib/pedagogy";

// Русские ярлыки навыков в порядке показа.
const SKILL_ROWS: { key: keyof Skills; label: string }[] = [
  { key: "grammar", label: "Грамматика" },
  { key: "vocab", label: "Лексика" },
  { key: "listening", label: "Аудирование" },
  { key: "reading", label: "Чтение" },
  { key: "speaking", label: "Speaking" },
];

const PROFILE_LOAD_TIMEOUT_MS = 2500;

export function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const fallback = window.setTimeout(() => {
      if (alive) setLoading(false);
    }, PROFILE_LOAD_TIMEOUT_MS);

    getProfileStore()
      .load()
      .then((p) => {
        if (alive) {
          setProfile(p ?? null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (alive) setLoading(false);
      })
      .finally(() => {
        window.clearTimeout(fallback);
      });
    return () => {
      alive = false;
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="lyra-profile">
      <div className="lyra-profile-top">
        <Link href="/lesson" className="lyra-icon-btn" aria-label="Назад">
          ‹
        </Link>
        <div className="lyra-chip cool">
          <span className="lyra-status-dot" /> Твой профиль
        </div>
      </div>

      {loading ? (
        <div className="lyra-card lyra-profile-card">Загружаю профиль…</div>
      ) : !profile || !profile.cefrLevel ? (
        <EmptyState />
      ) : (
        <ProfileBody profile={profile} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="lyra-card lyra-profile-card">
      <div className="lyra-label">Профиль пуст</div>
      <p className="lyra-muted lyra-profile-copy">
        Пройди короткую диагностику — мы определим твой уровень и начнём
        запоминать, как тебе удобнее учиться.
      </p>
      <Link
        href="/diagnostics"
        className="lyra-btn primary"
      >
        Определить мой уровень →
      </Link>
    </div>
  );
}

function ProfileBody({ profile }: { profile: UserProfile }) {
  const { gamification: g } = profile;

  return (
    <>
      {/* Имя + уровень + стрик */}
      <div className="lyra-card lyra-profile-card lyra-profile-hero">
        {profile.name && <div className="lyra-profile-name">{profile.name}</div>}
        <div className="lyra-label">Твой уровень</div>
        <div className="lyra-result-level">{profile.cefrLevel}</div>
        {profile.goal && (
          <p className="lyra-profile-goal">
            Цель: {learningGoalLabel(profile.goal)}
          </p>
        )}
        <div className="lyra-streak-row">
          <span>🔥 Стрик: <b>{g.streak}</b> дн.</span>
          <span>🏆 Рекорд: <b>{g.bestStreak}</b> дн.</span>
        </div>
      </div>

      {/* Цель дня + XP */}
      <DailyGoalCard gamification={g} />

      {/* Подписка */}
      <SubscriptionCard profile={profile} />


      {/* Карта навыков */}
      <div className="lyra-card lyra-profile-card">
        <div className="lyra-eyebrow">Карта навыков</div>
        {SKILL_ROWS.map(({ key, label }) => {
          const v = Math.round(profile.skills[key]);
          return (
            <div className="lyra-skill-row" key={key}>
              <div className="lyra-skill-head">
                <span>{label}</span>
                <span className="lyra-skill-pct">{v}%</span>
              </div>
              <div className="lyra-progress">
                <i style={{ width: `${v}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ЯДРО: как тебе заходит лучше */}
      <ConceptCard profile={profile} />

      {/* Слабые темы */}
      {profile.weakTopics.length > 0 && (
        <div className="lyra-card lyra-profile-card">
          <div className="lyra-eyebrow">Над чем работаем</div>
          {[...profile.weakTopics]
            .sort((a, b) => b.weight - a.weight)
            .map((w) => (
              <span
                className={`lyra-topic-pill ${w.mastery >= 0.8 ? "" : "hot"}`}
                key={w.topic}
              >
                {topicLabel(w.topic)}
                {w.mastery > 0 && ` · ${Math.round(w.mastery * 100)}%`}
              </span>
            ))}
        </div>
      )}
    </>
  );
}

// Карточка подписки: тариф + статус. Биллинг подключим позже — пока
// показываем текущий план (free по умолчанию) и CTA на премиум.
// Цель дня + суммарный XP — ядро удержания (Duolingo-style daily goal).
function DailyGoalCard({ gamification }: { gamification: Gamification }) {
  const today = dayKey(new Date().toISOString());
  const p = dailyProgress(gamification, today);
  return (
    <div className="lyra-card lyra-profile-card">
      <div className="lyra-goalday-head">
        <div className="lyra-eyebrow">Цель дня</div>
        <div className="lyra-xp-total">⚡ {gamification.xp} XP</div>
      </div>
      <div className="lyra-goalday-row">
        <span>
          <b>{p.done}</b> / {p.goal} XP {p.met && <span className="lyra-goal-met">✓ цель взята</span>}
        </span>
        <span className="lyra-skill-pct">{p.pct}%</span>
      </div>
      <div className={`lyra-progress${p.met ? " met" : ""}`}>
        <i style={{ width: `${p.pct}%` }} />
      </div>
    </div>
  );
}

function SubscriptionCard({ profile }: { profile: UserProfile }) {
  const sub = profile.subscription;
  const isPremium = sub.plan === "premium";
  const renews =
    sub.renewsAt &&
    new Date(sub.renewsAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

  return (
    <div className="lyra-card lyra-profile-card">
      <div className="lyra-eyebrow">Подписка</div>
      <div className="lyra-sub-row">
        <span className={`lyra-plan-badge ${isPremium ? "premium" : "free"}`}>
          {isPremium ? "Premium" : "Free"}
        </span>
        <span className="lyra-skill-pct">
          {isPremium
            ? renews
              ? `продление ${renews}`
              : "активна"
            : "базовый доступ"}
        </span>
      </div>
      {!isPremium && (
        <p className="lyra-muted lyra-profile-copy">
          Premium откроет безлимитные уроки, аудирование и speaking. Подключим
          оплату — будет доступно здесь.
        </p>
      )}
    </div>
  );
}

// Витрина движка концепций: либо «твоя рабочая подача», либо честный
// статус накопления сигнала (анти-шум: решаем не раньше MIN_SESSIONS_TO_LOCK).
function ConceptCard({ profile }: { profile: UserProfile }) {
  const scores = profile.conceptScores;
  // Ранжируем концепции по тому же баллу, что и движок (retention важнее).
  const ranked = [...ALL_CONCEPTS].sort(
    (a, b) => conceptValue(scores[b]) - conceptValue(scores[a])
  );
  const preferred = profile.preferredConcept;
  // Сколько ещё показов до закрепления хоть одной концепции.
  const bestN = Math.max(...ALL_CONCEPTS.map((c) => scores[c].n));
  const sessionsLeft = Math.max(0, MIN_SESSIONS_TO_LOCK - bestN);

  return (
    <div className="lyra-card lyra-profile-card">
      <div className="lyra-eyebrow">Как тебе заходит лучше</div>

      {preferred ? (
        <div className="lyra-win-line">
          Сейчас ведём тебя так:{" "}
          <b>{CONCEPT_LABEL[preferred]}</b>
          <span className="lyra-win-hint">{CONCEPT_HINT[preferred]}</span>
        </div>
      ) : (
        <p className="lyra-muted lyra-profile-copy">
          Пробуем разные стили подачи и замеряем, что заходит именно тебе.
          {sessionsLeft > 0
            ? ` Осталось ~${sessionsLeft} ${plural(sessionsLeft)} — и закрепим рабочий стиль.`
            : " Скоро закрепим рабочий стиль."}
        </p>
      )}

      {/* Сравнение стилей по накопленному сигналу */}
      <div className="lyra-concept-list">
        {ranked.map((c: ConceptId) => {
          const s = scores[c];
          const val = Math.round(conceptValue(s) * 100);
          const isWin = c === preferred;
          return (
            <div className="lyra-skill-row" key={c}>
              <div className="lyra-skill-head">
                <span>
                  {CONCEPT_LABEL[c]}
                  {isWin && <span className="lyra-win-badge">рабочий</span>}
                </span>
                <span className="lyra-skill-pct">{s.n > 0 ? `${val}%` : "—"}</span>
              </div>
              <div className="lyra-progress">
                <i
                  className={isWin ? "lyra-win-fill" : undefined}
                  style={{ width: `${s.n > 0 ? val : 0}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function plural(n: number): string {
  const d = n % 10;
  const dd = n % 100;
  if (d === 1 && dd !== 11) return "сессия";
  if (d >= 2 && d <= 4 && (dd < 10 || dd >= 20)) return "сессии";
  return "сессий";
}
