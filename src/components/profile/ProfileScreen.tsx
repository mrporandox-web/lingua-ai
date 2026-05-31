"use client";

// Экран профиля ученика — витрина «движка памяти» (главный дифференциатор).
// Показывает то, что система уже знает про юзера: уровень CEFR, карту навыков,
// слабые темы, стрик и — ядро — КАКАЯ подача заходит лучше (preferredConcept)
// либо честный статус «копим сигнал, осталось N сессий».
// Только чтение профиля через ProfileStore + переиспользование визуала уроков.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";
import { getProfileStore } from "@/lib/store";
import {
  ALL_CONCEPTS,
  type ConceptId,
  type Skills,
  type UserProfile,
} from "@/lib/store/types";
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

export function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
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
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="phone">
      <Backdrop />
      <div className="app">
        <div className="top">
          <Link href="/lesson" className="x" aria-label="Назад">
            ‹
          </Link>
          <div className="chip" style={{ margin: 0 }}>
            <span className="dot" /> Твой профиль
          </div>
        </div>

        {loading ? (
          <div className="card">Загружаю профиль…</div>
        ) : !profile || !profile.cefrLevel ? (
          <EmptyState />
        ) : (
          <ProfileBody profile={profile} />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card">
      <div className="lbl">Профиль пуст</div>
      <p className="note" style={{ borderTop: "none", marginTop: 10 }}>
        Пройди короткую диагностику — мы определим твой уровень и начнём
        запоминать, как тебе удобнее учиться.
      </p>
      <Link
        href="/diagnostics"
        className="btn go ready"
        style={{ display: "block", textAlign: "center", marginTop: 8 }}
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
      <div className="card">
        {profile.name && <div className="nameHead">{profile.name}</div>}
        <div className="lbl">Твой уровень</div>
        <div className="big">{profile.cefrLevel}</div>
        <div className="streakRow">
          <span>🔥 Стрик: <b>{g.streak}</b> дн.</span>
          <span>🏆 Рекорд: <b>{g.bestStreak}</b> дн.</span>
        </div>
      </div>

      {/* Подписка */}
      <SubscriptionCard profile={profile} />


      {/* Карта навыков */}
      <div className="card">
        <div className="qmeta">Карта навыков</div>
        {SKILL_ROWS.map(({ key, label }) => {
          const v = Math.round(profile.skills[key]);
          return (
            <div className="skillRow" key={key}>
              <div className="skillHead">
                <span>{label}</span>
                <span className="skillPct">{v}%</span>
              </div>
              <div className="bar" style={{ marginBottom: 0 }}>
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
        <div className="card">
          <div className="qmeta">Над чем работаем</div>
          {[...profile.weakTopics]
            .sort((a, b) => b.weight - a.weight)
            .map((w) => (
              <span
                className={`pill ${w.mastery >= 0.8 ? "" : "hot"}`}
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
    <div className="card">
      <div className="qmeta">Подписка</div>
      <div className="subRow">
        <span className={`planBadge ${isPremium ? "premium" : "free"}`}>
          {isPremium ? "✦ Premium" : "Free"}
        </span>
        <span className="skillPct">
          {isPremium
            ? renews
              ? `продление ${renews}`
              : "активна"
            : "базовый доступ"}
        </span>
      </div>
      {!isPremium && (
        <p className="note" style={{ borderTop: "none", marginTop: 10 }}>
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
    <div className="card">
      <div className="qmeta">Как тебе заходит лучше</div>

      {preferred ? (
        <div className="winLine">
          Сейчас ведём тебя так:{" "}
          <b>{CONCEPT_LABEL[preferred]}</b>
          <span className="winHint">{CONCEPT_HINT[preferred]}</span>
        </div>
      ) : (
        <p className="note" style={{ borderTop: "none", marginTop: 6 }}>
          Пробуем разные стили подачи и замеряем, что заходит именно тебе.
          {sessionsLeft > 0
            ? ` Осталось ~${sessionsLeft} ${plural(sessionsLeft)} — и закрепим рабочий стиль.`
            : " Скоро закрепим рабочий стиль."}
        </p>
      )}

      {/* Сравнение стилей по накопленному сигналу */}
      <div style={{ marginTop: 14 }}>
        {ranked.map((c: ConceptId) => {
          const s = scores[c];
          const val = Math.round(conceptValue(s) * 100);
          const isWin = c === preferred;
          return (
            <div className="skillRow" key={c}>
              <div className="skillHead">
                <span>
                  {CONCEPT_LABEL[c]}
                  {isWin && <span className="winBadge">рабочий</span>}
                </span>
                <span className="skillPct">{s.n > 0 ? `${val}%` : "—"}</span>
              </div>
              <div className="bar" style={{ marginBottom: 0 }}>
                <i
                  className={isWin ? "winFill" : undefined}
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
