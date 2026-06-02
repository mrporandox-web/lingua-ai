"use client";

// useTts — клиентский хук озвучки фразы (Фаза 4, listening).
//
// Порядок источников (от мгновенного к дорогому):
//   1) Статика public/tts/<hash>.wav по манифесту — предзапечённые фразы урока.
//      Играют мгновенно с CDN, БЕЗ запроса к Gemini и БЕЗ трат токенов.
//   2) Рантайм-кэш blob-URL в памяти — для уже синтезированных в этой сессии.
//   3) /api/tts — живой синтез (AI-сгенерированные фразы, которых нет в статике).
//
// Фолбэк-безопасно: нет аудио (204 / сеть / abort) → молча ничего не играем,
// listening деградирует мягко, урок не ломается.

import { useCallback, useEffect, useRef, useState } from "react";
import { apiUrl } from "@/lib/api";

// Манифест предзапечённых фраз: { "<текст>": "<файл>.wav" }. Грузим один раз.
let manifestPromise: Promise<Record<string, string>> | null = null;
function loadManifest(): Promise<Record<string, string>> {
  if (!manifestPromise) {
    manifestPromise = fetch("/tts/manifest.json")
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}));
  }
  return manifestPromise;
}

interface TtsState {
  /** идёт ли синтез/загрузка прямо сейчас (для спиннера на кнопке) */
  loading: boolean;
  /** озвучить фразу: фетчит при первом разе, дальше играет из кэша */
  speak: (text: string) => Promise<void>;
}

export function useTts(): TtsState {
  const [loading, setLoading] = useState(false);

  // кэш blob-URL по тексту фразы; переживает ре-рендеры через ref
  const cacheRef = useRef<Map<string, string>>(new Map());
  // текущий проигрыватель — чтобы оборвать предыдущий перед новым стартом
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // защита от setState после размонтирования
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    const cache = cacheRef.current;
    return () => {
      aliveRef.current = false;
      // отдаём память: рвём проигрыш и освобождаем blob-URL'ы
      audioRef.current?.pause();
      for (const url of cache.values()) URL.revokeObjectURL(url);
      cache.clear();
    };
  }, []);

  const play = useCallback((src: string) => {
    audioRef.current?.pause(); // оборвать прошлую фразу, если ещё играет
    const audio = new Audio(src);
    audioRef.current = audio;
    // play() может отклониться (нет жеста юзера / гонка) — это не ошибка урока
    audio.play().catch(() => {});
  }, []);

  const speak = useCallback(
    async (text: string) => {
      const key = text.trim();
      if (!key) return;

      // 1) предзапечённая статика — мгновенно, без сети к Gemini и без токенов
      const manifest = await loadManifest();
      const staticFile = manifest[key];
      if (staticFile) {
        play(`/tts/${staticFile}`);
        return;
      }

      // 2) уже синтезировали в этой сессии — играем из памяти
      const cached = cacheRef.current.get(key);
      if (cached) {
        play(cached);
        return;
      }

      // 3) живой синтез через API (фразы вне статики, напр. AI-генерация)
      setLoading(true);
      try {
        const res = await fetch(apiUrl("/api/tts"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: key }),
        });
        // 204 (нет ключа/Gemini отказал) или иная не-200 → тихо молчим
        if (!res.ok || res.status === 204) return;

        const blob = await res.blob();
        if (blob.size === 0) return;
        if (!aliveRef.current) return;

        const url = URL.createObjectURL(blob);
        cacheRef.current.set(key, url);
        play(url);
      } catch {
        // сеть/парс — тихий фолбэк, listening просто молчит
      } finally {
        if (aliveRef.current) setLoading(false);
      }
    },
    [play]
  );

  return { loading, speak };
}
