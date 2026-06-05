"use client";

// Калибровка подхода — финал онбординга (после теста уровня).
// Поток: pick (выбери, какое объяснение зашло) → reveal (ВАУ «нашли, как тебя
// учить») → paywall (ценник). После — в курс. Концепцию закрепляем сервисом
// calibrateConcept (первичный замер; движок уточняет её в реальных уроках).

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { ConceptId } from "@/lib/store/types";
import { CONCEPT_LABEL, CONCEPT_HINT } from "@/lib/pedagogy";
import { calibrateConcept } from "@/lib/learning";

// Мини-тема для замера подачи: Present Simple, he/she/it + -s («She works»).
// Одно правило, объяснённое тремя стилями — ученик выбирает, что зашло.
type StyleCard = { concept: ConceptId; sample: string };
const CALIBRATION_CARDS: StyleCard[] = [
  {
    concept: "rule-first",
    sample:
      "Правило: для <b>he / she / it</b> к глаголу добавляем <b>-s</b>. work → works. <b>She works.</b>",
  },
  {
    concept: "examples-first",
    sample:
      "<i>He plays. She works. It rains.</i> Замечаешь закономерность? У he/she/it глагол получает <b>-s</b>.",
  },
  {
    concept: "contrast-native",
    sample:
      "В русском «она работает» — окончание у глагола. В английском так же: <b>she works</b>. Логика знакомая.",
  },
];

type Phase = "pick" | "reveal" | "paywall";

export function ConceptCalibration({ name }: { name: string | null }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("pick");
  const [chosen, setChosen] = useState<ConceptId | null>(null);
  const [saving, setSaving] = useState(false);

  // Выбор стиля → закрепляем концепцию в профиле → переходим к вау.
  const onPick = useCallback(
    async (concept: ConceptId) => {
      if (saving) return;
      setSaving(true);
      setChosen(concept);
      try {
        await calibrateConcept(concept);
      } catch (e) {
        console.warn("[calibration] не удалось сохранить подход:", e);
      }
      setSaving(false);
      setPhase("reveal");
    },
    [saving]
  );

  const goToCourse = useCallback(() => router.push("/course"), [router]);

  // ── Фаза 1: выбор подачи ────────────────────────────────────────────────────
  if (phase === "pick") {
    return (
      <div className="lyra-calibrate">
        <div className="lyra-chip cool">
          <span className="lyra-status-dot" /> Подбираем подход
        </div>
        <h1 className="lyra-calibrate-title">
          {name ? `${name}, маленький эксперимент` : "Маленький эксперимент"}
        </h1>
        <p className="lyra-muted lyra-calibrate-copy">
          Вот одна тема, объяснённая по-разному. Выбери, как тебе{" "}
          <b>понятнее всего</b> — так мы поймём, как тебя учить.
        </p>
        <div className="lyra-calibrate-cards">
          {CALIBRATION_CARDS.map((c) => (
            <button
              key={c.concept}
              className="lyra-calibrate-card"
              onClick={() => onPick(c.concept)}
              disabled={saving}
            >
              <span className="lyra-calibrate-card-label">
                {CONCEPT_LABEL[c.concept]}
              </span>
              <span
                className="lyra-calibrate-card-sample"
                dangerouslySetInnerHTML={{ __html: c.sample }}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Фаза 2: ВАУ-момент «нашли, как тебя учить» ──────────────────────────────
  if (phase === "reveal" && chosen) {
    return (
      <div className="lyra-lesson lyra-reveal">
        <div className="lyra-reveal-aura" aria-hidden />
        <div className="lyra-reveal-spark" aria-hidden>✦</div>
        <p className="lyra-reveal-kicker">Мы кое-что про тебя поняли</p>
        <h1 className="lyra-reveal-title">
          Нашли, как тебе<br />учить лучше всего
        </h1>
        <div className="lyra-reveal-card">
          <span className="lyra-reveal-card-label">Твой формат подачи</span>
          <span className="lyra-reveal-concept">{CONCEPT_LABEL[chosen]}</span>
          <span className="lyra-reveal-hint">{CONCEPT_HINT[chosen]}</span>
        </div>
        <p className="lyra-reveal-sub">
          Так ты будешь учиться заметно быстрее. Дальше мы будем объяснять новые
          темы именно так — и подмечать, если твой стиль изменится.
        </p>
        <button className="lyra-btn primary" onClick={() => setPhase("paywall")}>
          Хочу так учиться →
        </button>
      </div>
    );
  }

  // ── Фаза 3: ценник (заглушка — без реальной оплаты) ─────────────────────────
  return (
    <div className="lyra-paywall">
      <div className="lyra-chip cool">
        <span className="lyra-status-dot" /> Полный доступ
      </div>
      <h1 className="lyra-paywall-title">
        Учись по своему<br />персональному методу
      </h1>
      <div className="lyra-paywall-price">
        <span className="lyra-paywall-amount">299 ₽</span>
        <span className="lyra-paywall-period">/ месяц</span>
      </div>
      <ul className="lyra-paywall-feats">
        <li>🎯 Подача под тебя — учишься быстрее</li>
        <li>📚 Весь курс A1–B2, 64 темы</li>
        <li>🔁 Умное повторение, чтобы не забывать</li>
        <li>🔥 Стрики и цели — не бросишь на полпути</li>
      </ul>
      <button className="lyra-btn primary" onClick={goToCourse}>
        Оформить за 299 ₽/мес
      </button>
      <button className="lyra-link-btn" onClick={goToCourse}>
        Пока попробую бесплатно
      </button>
      <p className="lyra-paywall-fine">Отмена в любой момент</p>
    </div>
  );
}
