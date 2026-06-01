// Распознавание речи — единый интерфейс для веба и натива.
// • Натив (Capacitor) → @capacitor-community/speech-recognition → on-device
//   движок Apple/Android: мгновенно, без сервера (главная причина идти в сторы).
// • Веб → Web Speech API (SpeechRecognition) — мгновенно в Chrome/Android,
//   капризно/отсутствует на iOS Safari (там позже спасёт натив).
// Возвращаем распознанный текст; пословную сверку с эталоном делает вызывающий.

import { Capacitor } from "@capacitor/core";

// Минимальные типы Web Speech API (нет в стандартных DOM-типах).
interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface WebSpeechRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}
type WebSpeechCtor = new () => WebSpeechRecognition;

function webCtor(): WebSpeechCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: WebSpeechCtor;
    webkitSpeechRecognition?: WebSpeechCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Поддерживается ли распознавание на этой платформе. */
export function isSpeechSupported(): boolean {
  if (Capacitor.isNativePlatform()) return true; // нативный плагин
  return webCtor() !== null;
}

export interface RecognizeOptions {
  lang?: string; // BCP-47, по умолчанию en-US
  onPartial?: (text: string) => void; // живой промежуточный текст
  signal?: AbortSignal; // отмена
}

/** Один проход распознавания: слушаем фразу, возвращаем распознанный текст. */
export async function recognizeOnce(
  opts: RecognizeOptions = {}
): Promise<string> {
  const lang = opts.lang ?? "en-US";
  return Capacitor.isNativePlatform()
    ? recognizeNative(lang, opts)
    : recognizeWeb(lang, opts);
}

// ── Натив: on-device речь Apple/Android ─────────────────────────────────────
async function recognizeNative(
  lang: string,
  opts: RecognizeOptions
): Promise<string> {
  const { SpeechRecognition } = await import(
    "@capacitor-community/speech-recognition"
  );
  await SpeechRecognition.requestPermissions();
  let partialOff: (() => void) | undefined;
  if (opts.onPartial) {
    const h = await SpeechRecognition.addListener("partialResults", (d) => {
      const t = (d as { matches?: string[] }).matches?.[0];
      if (t) opts.onPartial?.(t);
    });
    partialOff = () => void h.remove();
  }
  try {
    const res = await SpeechRecognition.start({
      language: lang,
      maxResults: 1,
      partialResults: !!opts.onPartial,
      popup: false,
    });
    return ((res as { matches?: string[] })?.matches?.[0] ?? "").trim();
  } finally {
    partialOff?.();
  }
}

// ── Веб: Web Speech API (мгновенно в Chrome/Android) ────────────────────────
function recognizeWeb(lang: string, opts: RecognizeOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const Ctor = webCtor();
    if (!Ctor) return reject(new Error("speech-not-supported"));
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = !!opts.onPartial;
    rec.maxAlternatives = 1;
    rec.continuous = false;

    let finalText = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (interim && opts.onPartial) opts.onPartial(interim);
    };
    rec.onerror = (e) => reject(new Error(e.error || "speech-error"));
    rec.onend = () => resolve(finalText.trim());

    opts.signal?.addEventListener("abort", () => rec.abort());
    rec.start();
  });
}
