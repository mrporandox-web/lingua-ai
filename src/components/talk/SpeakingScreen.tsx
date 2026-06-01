"use client";

// Экран speaking (прототип): Lyra произносит фразу → юзер повторяет в микрофон →
// распознаём (on-device в нативе / Web Speech в браузере) → пословная сверка.
// Низкая задержка: распознавание на устройстве, без серверного round-trip.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LyraCard, LyraOrb } from "@/components/lyra";
import { useTts } from "@/lib/tts/useTts";
import { isSpeechSupported, recognizeOnce } from "@/lib/speech/recognizer";
import { scoreSpeech, type SpeechScore } from "@/lib/speech/score";

interface Phrase {
  en: string;
  ru: string;
}
const PHRASES: Phrase[] = [
  { en: "I would like a coffee", ru: "Я бы хотел кофе" },
  { en: "How are you today", ru: "Как ты сегодня?" },
  { en: "Nice to meet you", ru: "Приятно познакомиться" },
  { en: "Where is the station", ru: "Где находится вокзал?" },
  { en: "Can you help me please", ru: "Можешь мне помочь, пожалуйста?" },
];

type Phase = "idle" | "listening" | "result";

export function SpeakingScreen() {
  const { speak } = useTts();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [partial, setPartial] = useState("");
  const [result, setResult] = useState<SpeechScore | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const phrase = PHRASES[idx];

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  async function listen() {
    setPhase("listening");
    setPartial("");
    setResult(null);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const heard = await recognizeOnce({
        lang: "en-US",
        onPartial: (t) => setPartial(t),
        signal: ctrl.signal,
      });
      setResult(scoreSpeech(phrase.en, heard));
      setPhase("result");
    } catch {
      // нет разрешения / сбой — мягко возвращаемся
      setPhase("idle");
    }
  }

  function next() {
    setIdx((i) => (i + 1) % PHRASES.length);
    setPhase("idle");
    setPartial("");
    setResult(null);
  }

  return (
    <section className="lyra-talk">
      <div className="lyra-talk-orb">
        <LyraOrb size={88} cool />
      </div>

      <LyraCard className="lyra-talk-card">
        <p className="lyra-eyebrow gold">English speaking</p>

        {/* Фраза + перевод */}
        <h1 className="lyra-title lyra-speak-phrase">{phrase.en}</h1>
        <p className="lyra-muted">{phrase.ru}</p>

        {/* Кнопки: послушать эталон + повторить */}
        <div className="lyra-speak-actions">
          <button
            className="lyra-btn ghost"
            onClick={() => speak(phrase.en)}
            type="button"
          >
            🔊 Послушать
          </button>
          <button
            className="lyra-btn primary"
            onClick={listen}
            disabled={phase === "listening" || supported === false}
            type="button"
          >
            {phase === "listening" ? "Слушаю…" : "🎤 Повторить"}
          </button>
        </div>

        {/* Живой промежуточный текст */}
        {phase === "listening" && (
          <p className="lyra-speak-partial">{partial || "говори…"}</p>
        )}

        {/* Результат: пословная подсветка + процент */}
        {phase === "result" && result && (
          <div className="lyra-speak-result">
            <div className="lyra-speak-score">{result.percent}%</div>
            <div className="lyra-speak-words">
              {result.words.map((w, i) => (
                <span key={i} className={w.ok ? "ok" : "miss"}>
                  {w.word}
                </span>
              ))}
            </div>
            <p className="lyra-muted lyra-speak-heard">
              {result.heard ? `Услышал: «${result.heard}»` : "Не расслышал"}
            </p>
            <div className="lyra-speak-actions">
              <button className="lyra-btn ghost" onClick={listen} type="button">
                Ещё раз
              </button>
              <button className="lyra-btn primary" onClick={next} type="button">
                Дальше →
              </button>
            </div>
          </div>
        )}

        {/* Честное предупреждение, если распознавание недоступно */}
        {supported === false && (
          <p className="lyra-muted lyra-speak-warn">
            На этом устройстве распознавание речи недоступно. Лучше открыть в
            Chrome (Android/ПК) — или в приложении Lyra из стора.
          </p>
        )}

        <Link href="/lesson" className="lyra-link">
          Вернуться к урокам
        </Link>
      </LyraCard>
    </section>
  );
}
