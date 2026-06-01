"use client";

// Эталонный экран урока Lingua-AI — sentence-builder «собери фразу».
// Портировано 1:1 из prototype/lesson.html: концепт-чип, кино-reveal задания,
// поп-анимация токенов, FLIP-перелёт банк→ответ, feedback-шторка с 3-уровневым
// «объясни почему» (фича против Duolingo), конфетти + haptic, shake на ошибке,
// сердца / стрик / прогресс. ITEMS и explainError — из src/lib/lesson/items.ts.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  explainFor,
  explainStructured,
  type ErrorBlock,
  type LessonItem,
} from "@/lib/lesson/items";
import { itemsForTopic } from "@/lib/lesson/content";
import { getTopic } from "@/lib/course/curriculum";
import type { ConceptId, UserProfile } from "@/lib/store/types";
import { CONCEPT_LABEL } from "@/lib/pedagogy";
import {
  startSession,
  submitAnswer,
  scoreRetention,
  recordActivity,
} from "@/lib/learning";
import { useTts } from "@/lib/tts/useTts";

// Какие концепции реально написаны для темы (есть в byConcept) + дефолт.
function availableConcepts(item: LessonItem): ConceptId[] {
  const written = Object.keys(item.byConcept) as ConceptId[];
  // contrast-native всегда доступен через плоский fallback.
  return written.includes("contrast-native")
    ? written
    : [...written, "contrast-native"];
}

// Стабильный id темы+фразы для SRS-очереди (topic один на все айтемы, нужна фраза).
function itemKey(item: LessonItem): string {
  return `${item.topic}::${item.correct.join(" ")}`;
}

// Под какую тему заказывать AI-упражнения. Ядро адаптивности: берём самую
// «слабую» тему ученика (макс. weight в профиле). Профиля/слабых тем ещё нет
// (свежий аноним) → дефолт present-continuous (тема статических ITEMS).
function selectWeakTopic(profile: UserProfile | null): string {
  const weak = profile?.weakTopics;
  if (!weak || weak.length === 0) return "present-continuous";
  // макс. по weight; при равенстве — первый (стабильно).
  return weak.reduce((a, b) => (b.weight > a.weight ? b : a)).topic;
}

const CONFETTI_COLORS = ["#7c5cff", "#5ce0c8", "#ff5c9d", "#fbbf24", "#4ade80"];

// Сердца («жизни») на ОДИН урок — не история, а текущая попытка: сбрасываются
// каждым уроком, поэтому живут в локальном state, а не в профиле.
const HEARTS_PER_LESSON = 5;

type PickedTok = { id: number; word: string; bankIdx: number };

function haptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function LessonScreen({ topic }: { topic?: string | null }) {
  const [idx, setIdx] = useState(0);

  // Пачка упражнений: тема урока берётся из ?topic= (карта курса) — это
  // выверенный кураторский контент. Без темы → дефолт-витрина (present-continuous),
  // которую адаптивная AI-генерация (Фаза 3) может тихо подменить под слабую тему.
  // Любой сбой генерации → остаёмся на статике, продукт не ломается.
  const [items, setItems] = useState<LessonItem[]>(() => itemsForTopic(topic));
  const item: LessonItem = items[idx] ?? items[0];

  // профиль ученика + концепция подачи, выбранная движком памяти
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeConcept, setActiveConcept] =
    useState<ConceptId>("contrast-native");

  // listening (Фаза 4): озвучка эталонной английской фразы через Gemini TTS.
  // Хук кэширует синтез по тексту — повторный 🔊 на той же фразе сети не дёргает.
  const { loading: ttsLoading, speak } = useTts();

  // загрузка профиля при монтировании через сервис обучения. Концепцию здесь
  // НЕ выбираем — этим занимается эффект ниже (по idx + готовности профиля),
  // чтобы не было двойного startSession на старте.
  useEffect(() => {
    let alive = true;
    startSession(items[0].topic, availableConcepts(items[0])).then((plan) => {
      if (!alive) return;
      setProfile(plan.profile);
      // подтягиваем РЕАЛЬНЫЙ стрик из истории профиля (честная замена «🔥 7»).
      setStreak(plan.profile.gamification.streak);
    });
    return () => {
      alive = false;
    };
    // items[0] на маунте == ITEMS[0] (статика); подмена пачки концепцию не сбивает.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Фаза 3 (замыкаем петлю «память → генерация»): заказываем AI-упражнения
  // ПОД ПРОФИЛЬ ученика, а не вслепую. Гейт на profileReady — ждём, пока движок
  // памяти загрузит профиль (слабые темы + рабочую концепцию + уровень), и только
  // тогда просим Claude сгенерить под самую слабую тему этой концепцией и уровнем.
  // Фолбэк-безопасно: берём только source:"claude" с непустым валидным батчем,
  // иначе молчим на статических ITEMS. Стреляет один раз — когда профиль пришёл.
  useEffect(() => {
    if (!profile) return; // ждём загрузки профиля движком памяти
    if (topic) return; // явная тема курса = кураторский контент, AI не дёргаем
    let alive = true;
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // самая слабая тема ученика (адаптивность вместо хардкода темы)
            topic: selectWeakTopic(profile),
            count: 3,
            // рабочая концепция подачи, если движок памяти её уже выбрал;
            // нет сигнала → не шлём (route раскроет на все ALL_CONCEPTS)
            concepts: profile.preferredConcept
              ? [profile.preferredConcept]
              : undefined,
            // CEFR-уровень из диагностики (под него Claude подбирает лексику)
            cefrLevel: profile.cefrLevel ?? undefined,
          }),
          signal: ctrl.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          items?: LessonItem[];
          source?: string;
        };
        if (
          alive &&
          data.source === "claude" &&
          Array.isArray(data.items) &&
          data.items.length > 0
        ) {
          setIdx(0);
          setItems(data.items);
        }
      } catch {
        // сеть/abort/парс — тихий фолбэк на статические ITEMS
      }
    })();
    return () => {
      alive = false;
      ctrl.abort();
    };
    // profile?.id как триггер: анонимный id появляется один раз при загрузке
    // профиля и НЕ меняется во время урока, поэтому эффект стрельнёт ровно когда
    // профиль впервые пришёл, а не на каждом обновлении его содержимого (иначе
    // пачка пересоздавалась бы после каждого ответа). Внутри читаем свежий
    // profile из замыкания — eslint-правило о deps тут осознанно отключено.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  // собранные токены (порядок = порядок клика)
  const [picked, setPicked] = useState<PickedTok[]>([]);
  // какие индексы банка уже использованы (для .used)
  const [usedBank, setUsedBank] = useState<Set<number>>(new Set());
  // прогресс-бар урока — честные 0% на старте (растёт по мере ответов).
  const [prog, setProg] = useState(0);
  // стрик занятий — РЕАЛЬНАЯ история из профиля (gamification.streak).
  // 0 до загрузки профиля; затем подтягиваем настоящее число (см. эффект маунта).
  const [streak, setStreak] = useState(0);
  // сердца — текущая попытка урока, не история → стартуем с полного бака.
  const [hearts, setHearts] = useState(HEARTS_PER_LESSON);

  // feedback-шторка
  const [fb, setFb] = useState<null | "good" | "bad">(null);
  const [fbBlocks, setFbBlocks] = useState<ErrorBlock[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [shake, setShake] = useState(false);

  // конфетти-частицы
  const [confetti, setConfetti] = useState<
    { id: number; left: string; bg: string; delay: string; rot: string }[]
  >([]);

  const bankRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const tokSeq = useRef(0);

  // ── загрузка нового айтема (сброс поля) ─────────────────────────────────────
  const loadItem = useCallback(() => {
    setPicked([]);
    setUsedBank(new Set());
    setFb(null);
    setHintLevel(0);
  }, []);

  // профиль загружен? нужен как ТРИГГЕР (а не как зависимость по содержимому):
  // эффект ниже должен сработать ровно когда профиль впервые появился.
  const profileReady = profile !== null;

  // при смене idx (или появлении профиля) — мягкий сброс поля + перевыбор
  // концепции под новую тему. setState здесь — легитимная синхронизация UI
  // с новой темой (не каскад): выполняется на смене idx / готовности профиля.
  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    loadItem();
    if (!profile) return;
    const themed = items[idx] ?? items[0];
    let alive = true;
    // перевыбор концепции под новую тему через сервис (использует уже
    // накопленный профиль из стора, без повторного дёрганья движка из UI)
    startSession(themed.topic, availableConcepts(themed)).then((plan) => {
      if (alive) setActiveConcept(plan.concept);
    });
    return () => {
      alive = false;
    };
    // profileReady (boolean) в deps, не profile целиком: эффект стрельнёт один
    // раз когда профиль придёт + на смене темы, но НЕ на каждом обновлении
    // содержимого профиля (иначе чип «прыгал» бы прямо во время урока).
  }, [idx, profileReady, loadItem]);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

  const canCheck = picked.length > 0 && fb === null;

  // ── FLIP-перелёт клона слова банк → поле ответа ─────────────────────────────
  const flyWord = useCallback((fromEl: HTMLElement, word: string) => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion:reduce)").matches
    ) {
      return;
    }
    const a = fromEl.getBoundingClientRect();
    const toEl = answerRef.current?.lastElementChild as HTMLElement | null;
    if (!toEl) return;
    const b = toEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.className = "fly";
    ghost.textContent = word;
    ghost.style.left = `${a.left}px`;
    ghost.style.top = `${a.top}px`;
    document.body.appendChild(ghost);
    toEl.style.visibility = "hidden";
    requestAnimationFrame(() => {
      ghost.style.left = `${b.left}px`;
      ghost.style.top = `${b.top}px`;
      ghost.style.transform = "scale(1.04)";
    });
    setTimeout(() => {
      ghost.remove();
      toEl.style.visibility = "";
    }, 330);
  }, []);

  // ── выбор слова из банка ────────────────────────────────────────────────────
  const pick = useCallback(
    (bankIdx: number, word: string) => {
      if (usedBank.has(bankIdx) || fb !== null) return;
      const id = tokSeq.current++;
      setUsedBank((prev) => new Set(prev).add(bankIdx));
      setPicked((prev) => [...prev, { id, word, bankIdx }]);
      haptic(8);
      // перелёт после того, как React дорисует токен в поле ответа
      requestAnimationFrame(() => {
        const fromEl = bankRefs.current[bankIdx];
        if (fromEl) flyWord(fromEl, word);
      });
    },
    [usedBank, fb, flyWord]
  );

  // ── снятие слова из поля обратно в банк ─────────────────────────────────────
  const unpick = useCallback(
    (id: number, bankIdx: number) => {
      if (fb !== null) return;
      setPicked((prev) => prev.filter((p) => p.id !== id));
      setUsedBank((prev) => {
        const next = new Set(prev);
        next.delete(bankIdx);
        return next;
      });
    },
    [fb]
  );

  // ── конфетти (70 частиц, авто-очистка) ──────────────────────────────────────
  const fireConfetti = useCallback(() => {
    const batch = Array.from({ length: 70 }, (_, i) => ({
      id: tokSeq.current++,
      left: `${Math.random() * 100}%`,
      bg: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: `${Math.random() * 0.25}s`,
      rot: `rotate(${Math.random() * 360}deg)`,
    }));
    setConfetti(batch);
    setTimeout(() => setConfetti([]), 1400);
  }, []);

  // ── проверка ответа ─────────────────────────────────────────────────────────
  const check = useCallback(() => {
    const got = picked.map((p) => p.word);
    const ok = JSON.stringify(got) === JSON.stringify(item.correct);

    if (ok) {
      setFb("good");
      setFbBlocks([]);
      fireConfetti();
      haptic([10, 30, 10]);
      setProg(Math.round(((idx + 1) / items.length) * 100));
      // стрик: засчитываем «занимался сегодня» через сервис (пишет в профиль,
      // идемпотентно за день) и показываем РЕАЛЬНОЕ число дней подряд, а не +1.
      void recordActivity().then((p) => setStreak(p.gamification.streak));
      // listening: на успехе озвучиваем эталон — ученик слышит, как звучит фраза,
      // которую только что собрал. Фолбэк-безопасно: нет TTS → просто тишина.
      void speak(item.correct.join(" "));
    } else {
      setHintLevel(0);
      setFb("bad");
      setFbBlocks(explainStructured(got, item));
      setShake(true);
      setTimeout(() => setShake(false), 400);
      haptic([40, 60, 40]);
      setHearts((h) => Math.max(0, h - 1));
    }

    // проводка результата через сервис обучения (Фаза 2): сигнал концепции +
    // SRS-расписание + поток событий (learning_events). UI больше не дёргает
    // чистые функции движка напрямую — вся оркестровка в lib/learning/session.
    if (profile) {
      const key = itemKey(item);
      void (async () => {
        // 1) удержание (retentionD1): если айтем уже показывали ≥1 день назад и
        //    проводка ещё не зачтена — текущий ответ это и есть сигнал «запомнил».
        //    ВАЖНО: до submitAnswer, т.к. grade сбросит lastReviewed/флаг на сегодня.
        await scoreRetention({ item: key, remembered: ok });

        // 2) сигнал концепции + SRS + событие в поток. Возвращает свежий профиль.
        const res = await submitAnswer({
          topic: item.topic,
          item: key,
          concept: activeConcept,
          correct: ok,
        });
        setProfile(res.profile);
      })();
    }
  }, [picked, item, idx, items.length, fireConfetti, profile, activeConcept, speak]);

  // ── раскрутка подсказки вглубь: разбор → мостик → правило ────────────────────
  const moreWhy = useCallback(() => {
    setHintLevel((lvl) => lvl + 1);
  }, []);

  // ── переход дальше / повтор ──────────────────────────────────────────────────
  const isLast = idx >= items.length - 1;
  const next = useCallback(() => {
    const wasGood = fb === "good";
    setFb(null);
    setTimeout(() => {
      if (wasGood && !isLast) {
        setIdx((i) => i + 1);
      } else if (wasGood) {
        // тема пройдена — в демо стартуем заново
        setIdx(0);
        setProg(0);
      } else {
        // ошибка → то же задание, поле чистое
        setPicked([]);
        setUsedBank(new Set());
        setHintLevel(0);
      }
    }, 350);
  }, [fb, isLast]);

  // ── строки-блоки структурированного разбора ─────────────────────────────────
  const renderBlocks = (blocks: ErrorBlock[]) => (
    <div className="fbCard">
      {blocks.map((b, i) => (
        <div className={`fbRow tone-${b.tone}`} key={i}>
          <span className="fbRowIcon" aria-hidden>
            {b.icon}
          </span>
          <div className="fbRowBody">
            <span className="fbRowLabel">{b.label}</span>
            <span
              className="fbRowText"
              dangerouslySetInnerHTML={{ __html: b.html }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // ── рендер «объясни почему» по уровню ───────────────────────────────────────
  const renderWhy = () => {
    // объяснения берём в стиле активной концепции (движок памяти)
    const exp = explainFor(item, activeConcept);
    if (fb === "good") {
      return (
        <span
          className="fbWhyText"
          dangerouslySetInnerHTML={{ __html: exp.whyOk }}
        />
      );
    }
    // bad: сперва структурный разбор блоками, ниже — раскрутка вглубь
    if (hintLevel === 0) {
      return (
        <>
          {renderBlocks(fbBlocks)}
          <button className="why-btn" onClick={moreWhy}>
            почему так? →
          </button>
        </>
      );
    }
    if (hintLevel === 1) {
      return (
        <>
          {renderBlocks(fbBlocks)}
          <div className="fbDeeper">
            <span className="hint-tag">🧠 На пальцах</span>
            <span
              className="fbWhyText"
              dangerouslySetInnerHTML={{ __html: exp.bridge }}
            />
            <button className="why-btn" onClick={moreWhy}>
              короткое правило →
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        {renderBlocks(fbBlocks)}
        <div className="fbDeeper">
          <span className="hint-tag">📌 Правило</span>
          <span
            className="fbWhyText"
            dangerouslySetInnerHTML={{ __html: exp.rule }}
          />
        </div>
      </>
    );
  };

  return (
    <div className="app">
      {/* top bar: прогресс + стрик + сердца */}
      <div className="top">
        <button
          className="x"
          aria-label="Закрыть"
          onClick={() => {
            // сброс ТЕКУЩЕЙ попытки урока: позиция, прогресс-бар, сердца.
            // Стрик НЕ трогаем — это история занятий, а не состояние урока.
            setIdx(0);
            setProg(0);
            setHearts(HEARTS_PER_LESSON);
            loadItem();
          }}
        >
          ✕
        </button>
        <div className="prog">
          <i style={{ width: `${prog}%` }} />
        </div>
        <Link href="/profile" className="streak" aria-label="Мой профиль">
          🔥 <span>{streak}</span>
        </Link>
        <div className="hearts">❤ <span>{hearts}</span></div>
      </div>

      {/* концепт-чип — память про юзера (концепция выбрана движком) */}
      <div className="chip">
        <span className="dot" /> Тебе лучше заходит:{" "}
        <b>{CONCEPT_LABEL[activeConcept]}</b>
      </div>

      {/* кино-reveal задания (по словам) */}
      <h1 className="task reveal" key={idx}>
        {item.ru.split(" ").map((w, i) => (
          <span className="line" key={i}>
            <span className="word" style={{ ["--i" as string]: i }}>
              {w}
            </span>
          </span>
        ))}
      </h1>
      <p className="hintline">
        {(() => {
          const t = getTopic(item.topic);
          return t ? `${t.title} — ${t.blurb}. Собери фразу.` : "Собери фразу.";
        })()}
      </p>

      {/* sentence builder */}
      <div className={`stage${shake ? " shake" : ""}`}>
        <div className="answer" ref={answerRef}>
          {picked.map((p) => (
            <button
              key={p.id}
              className="tok"
              onClick={() => unpick(p.id, p.bankIdx)}
            >
              {p.word}
            </button>
          ))}
        </div>
        <div className="bank">
          {item.bank.map((w, i) => (
            <button
              key={i}
              ref={(el) => {
                bankRefs.current[i] = el;
              }}
              className={`tok${usedBank.has(i) ? " used" : ""}`}
              onClick={() => pick(i, w)}
            >
              {w}
            </button>
          ))}
        </div>
        {fb === null && (
          <button
            className={`btn go check${canCheck ? " ready" : ""}`}
            disabled={!canCheck}
            onClick={check}
          >
            Проверить
          </button>
        )}
      </div>

      {/* feedback sheet */}
      <div className={`fb${fb ? ` ${fb} show` : ""}`}>
        <div className="fbInner">
          <div className="fbHead">
            <span>{fb === "good" ? "✅ Отлично!" : "Почти! Давай разберём"}</span>
            {/* listening: послушать эталонную фразу. Виден только в шторке —
                до проверки прятать (это и есть ответ). Нет TTS → тишина. */}
            <button
              type="button"
              className="ttsBtn"
              aria-label="Послушать правильную фразу"
              disabled={ttsLoading}
              onClick={() => speak(item.correct.join(" "))}
            >
              {ttsLoading ? "…" : "🔊"}
            </button>
          </div>
          <div className="fbWhy">{fb && renderWhy()}</div>
          <button
            className={`btn ${fb === "good" ? "good2" : "bad2"}`}
            onClick={next}
          >
            {fb === "good"
              ? isLast
                ? "Тема пройдена ✓"
                : "Дальше →"
              : "Понятно, ещё раз"}
          </button>
        </div>
      </div>

      {/* конфетти */}
      <div className="confetti">
        {confetti.map((c) => (
          <span
            key={c.id}
            style={{
              left: c.left,
              background: c.bg,
              animationDelay: c.delay,
              transform: c.rot,
            }}
          />
        ))}
      </div>
    </div>
  );
}
