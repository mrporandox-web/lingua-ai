"use client";

// Экран диагностики уровня (Блок A) — адаптивный placement-тест.
// Вся логика подбора/шага живёт в чистом движке @/lib/placement/engine
// (тестируется отдельно). Этот компонент — только UI + сохранение итога:
//   вопрос → подсветка ответа → следующий (сложнее/проще) → финиш →
//   patch профиля (cefrLevel/skills.grammar/weakTopics/onboarded) → урок.
// Визуальный язык общий с уроком: .top/.prog, .card, .opt, .big, .pill.

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MAX_QUESTIONS,
  answerQuestion,
  finishPlacement,
  isPlacementDone,
  nextQuestion,
  startPlacement,
  type PlacementQuestion,
  type PlacementResult,
  type PlacementState,
} from "@/lib/placement/engine";
import { getProfileStore } from "@/lib/store";
import { topicLabel } from "@/lib/pedagogy";

// Лёгкая тактильная отдача (как в уроке) — без падений на десктопе.
function haptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// Подпись слабой темы — общий модуль @/lib/pedagogy (topicLabel).

export function DiagnosticsScreen() {
  const router = useRouter();

  // Состояние прогона диагностики (чистый движок) + текущий вопрос.
  const [state, setState] = useState<PlacementState>(() => startPlacement());
  const [question, setQuestion] = useState<PlacementQuestion | null>(() =>
    nextQuestion(startPlacement())
  );

  // Индекс выбранного варианта (для подсветки), пока ждём перехода к следующему.
  const [picked, setPicked] = useState<number | null>(null);

  // Итог диагностики (после последнего вопроса) + флаг сохранения.
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [saving, setSaving] = useState(false);

  // Шаг знакомства: имя ученика. greeted=false → сперва спрашиваем имя,
  // потом тест. Имя сохраняем в профиль, чтобы обращаться по нему дальше.
  const [greeted, setGreeted] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [savedName, setSavedName] = useState<string | null>(null);

  // Подтвердить имя (или пропустить) → сохранить в профиль и начать тест.
  const onGreet = useCallback(async () => {
    const clean = nameInput.trim().slice(0, 40);
    setSavedName(clean || null);
    setGreeted(true);
    try {
      const store = getProfileStore();
      await store.getOrCreate();
      await store.patch({ name: clean || null });
    } catch (e) {
      console.warn("[diagnostics] не удалось сохранить имя:", e);
    }
  }, [nameInput]);

  // Сколько вопросов уже отвечено и доля прогресса (для .bar).
  const answered = state.asked.length;
  const progress = useMemo(
    () => Math.min(100, Math.round((answered / MAX_QUESTIONS) * 100)),
    [answered]
  );

  // Зарегистрировать ответ: подсветить, через паузу — сдвинуть движок,
  // подобрать следующий вопрос либо свести прогон к результату.
  const onPick = useCallback(
    (optIdx: number) => {
      if (!question || picked !== null) return; // защита от двойного клика
      const correct = optIdx === question.answer;
      setPicked(optIdx);
      haptic(correct ? 20 : [10, 40, 10]);

      // Пауза, чтобы пользователь увидел зелёный/красный, затем шаг.
      window.setTimeout(() => {
        const advanced = answerQuestion(state, question, correct);
        setState(advanced);
        setPicked(null);
        if (isPlacementDone(advanced)) {
          setResult(finishPlacement(advanced, new Date().toISOString()));
          setQuestion(null);
        } else {
          setQuestion(nextQuestion(advanced));
        }
      }, 650);
    },
    [question, picked, state]
  );

  // Сохранить итог в профиль и уйти на урок. Диагностика — разовый онбординг,
  // поэтому пишем напрямую через стор (а не через сервис сессии урока).
  const onFinish = useCallback(async () => {
    if (!result || saving) return;
    setSaving(true);
    try {
      const store = getProfileStore();
      const profile = await store.getOrCreate();
      await store.patch({
        cefrLevel: result.cefrLevel,
        skills: { ...profile.skills, grammar: result.grammarAccuracy },
        weakTopics: result.weakTopics,
        onboarded: true,
      });
      router.push("/lesson");
    } catch (e) {
      console.warn("[diagnostics] не удалось сохранить профиль:", e);
      setSaving(false);
    }
  }, [result, saving, router]);

  // Если профиль уже прошёл онбординг — не гоняем тест повторно, сразу на урок.
  useEffect(() => {
    let alive = true;
    getProfileStore()
      .load()
      .then((p) => {
        if (!alive) return;
        if (p?.onboarded) {
          router.replace("/lesson");
          return;
        }
        // Имя уже знаем (вернулись посреди онбординга) — пропускаем знакомство.
        if (p?.name) {
          setSavedName(p.name);
          setNameInput(p.name);
          setGreeted(true);
        }
      });
    return () => {
      alive = false;
    };
  }, [router]);

  return (
    <div className="app">
      {/* top bar: прогресс прохождения теста */}
      <div className="top">
        <div className="prog" style={{ marginLeft: 0 }}>
          <i style={{ width: `${result ? 100 : progress}%` }} />
        </div>
      </div>

      {/* подпись-чип: что это за экран */}
      <div className="chip">
        <span className="dot" /> {greeted ? "Диагностика уровня" : "Знакомство"}
      </div>

      {!greeted ? (
        // === Шаг знакомства: спрашиваем имя до теста ===
        <div className="card" key="greet">
          <div className="q">Давай познакомимся 👋</div>
          <p className="hintline" style={{ marginBottom: 14 }}>
            Как тебя зовут? Буду обращаться по имени — так уютнее учиться.
          </p>
          <input
            className="nameInput"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onGreet()}
            placeholder="Твоё имя"
            maxLength={40}
            autoFocus
            aria-label="Твоё имя"
          />
          <button
            className="btn go ready"
            style={{ display: "block", width: "100%", marginTop: 14 }}
            onClick={onGreet}
          >
            {nameInput.trim() ? "Приятно познакомиться →" : "Пропустить →"}
          </button>
        </div>
      ) : result ? (
        // === Финишный экран: уровень + точность + слабые темы ===
        <div className="card" key="result">
          <div className="lbl">
            {savedName ? `${savedName}, твой уровень` : "Твой уровень"}
          </div>
          <div className="big">{result.cefrLevel}</div>
          <div className="lbl">Грамматика — {result.grammarAccuracy}% верных</div>

          {result.weakTopics.length > 0 && (
            <div style={{ marginTop: "18px" }}>
              <div className="qmeta">Над чем поработаем</div>
              {result.weakTopics.map((w) => (
                <span className="pill hot" key={w.topic}>
                  {topicLabel(w.topic)}
                </span>
              ))}
            </div>
          )}

          <p className="note">
            Дальше начнём с этих тем и подберём подачу, которая зайдёт именно
            тебе. Это и есть наша фишка — память про то, как ты учишься.
          </p>

          <button
            className="btn go ready"
            style={{ display: "block", width: "100%", marginTop: "16px" }}
            onClick={onFinish}
            disabled={saving}
          >
            {saving ? "Сохраняю…" : "Начать учиться →"}
          </button>
        </div>
      ) : question ? (
        // === Экран вопроса ===
        <div className="card" key={question.id}>
          <div className="bar">
            <i style={{ width: `${progress}%` }} />
          </div>
          <div className="qmeta">
            Вопрос {answered + 1} · уровень {question.lvl}
          </div>
          <div className="q">{question.q}</div>
          {question.opts.map((opt, i) => {
            // Подсветка после выбора: верный — зелёный, выбранный неверный — красный.
            let cls = "opt";
            if (picked !== null) {
              if (i === question.answer) cls += " ok";
              else if (i === picked) cls += " bad";
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => onPick(i)}
                disabled={picked !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        // Банк исчерпан без результата (страховка — не должно случаться).
        <div className="card">Готовим результат…</div>
      )}
    </div>
  );
}
