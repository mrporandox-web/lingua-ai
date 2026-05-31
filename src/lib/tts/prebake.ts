// Предзапекание озвучки: синтезируем ВСЕ статичные фразы урока в WAV-файлы
// в public/tts/ + манифест. Дальше клиент играет их мгновенно как статику
// (CDN/диск), без обращения к Gemini — нулевая задержка и ноль токенов.
//
// Запускается разово как dev-утилита (POST /api/tts/prebake). На проде роут
// закрыт (read-only FS). AI-сгенерированные фразы тут не пекутся — для них
// остаётся живой /api/tts с рантайм-кэшем.

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ITEMS } from "@/lib/lesson/items";
import { synthesizeWav } from "./gemini";

/** Все уникальные английские фразы, которые приложение озвучивает. */
export function spokenPhrases(): string[] {
  const set = new Set<string>();
  for (const it of ITEMS) set.add(it.correct.join(" ").trim());
  return [...set].filter(Boolean);
}

/** Детерминированное имя файла по тексту (совпадает на сервере и клиенте). */
export function ttsFileName(text: string): string {
  const h = createHash("sha1").update(text.trim()).digest("hex").slice(0, 16);
  return `${h}.wav`;
}

export interface PrebakeResult {
  total: number;
  baked: number;
  skipped: number;
  failed: string[];
  manifest: Record<string, string>;
}

/**
 * Синтезировать все статичные фразы в public/tts/ и записать manifest.json.
 * Идемпотентно по содержимому: имя файла = хэш текста.
 */
export async function prebakeAll(): Promise<PrebakeResult> {
  const phrases = spokenPhrases();
  const outDir = path.join(process.cwd(), "public", "tts");
  await mkdir(outDir, { recursive: true });

  const manifest: Record<string, string> = {};
  const failed: string[] = [];
  let baked = 0;

  for (const text of phrases) {
    const file = ttsFileName(text);
    try {
      const wav = await synthesizeWav(text);
      if (!wav) {
        failed.push(text);
        continue;
      }
      await writeFile(path.join(outDir, file), wav);
      manifest[text] = file;
      baked++;
    } catch {
      failed.push(text);
    }
  }

  await writeFile(
    path.join(outDir, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  return {
    total: phrases.length,
    baked,
    skipped: phrases.length - baked - failed.length,
    failed,
    manifest,
  };
}
