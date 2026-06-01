// Пословная сверка распознанной речи с эталонной фразой.
// Это НЕ оценка акцента (для неё нужен фонемный движок — Azure/Speechace, позже),
// а проверка «сказал ли ты нужные слова и разборчиво». Для MVP speaking достаточно.

export interface WordMatch {
  word: string; // слово эталона
  ok: boolean; // распозналось ли в речи юзера
}

export interface SpeechScore {
  percent: number; // 0..100 — доля совпавших слов эталона
  words: WordMatch[]; // пословная разметка эталона для подсветки
  heard: string; // что распозналось (нормализованное)
}

/** Нормализация: нижний регистр, без пунктуации, схлопнуть пробелы. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Сверить распознанное (heard) с эталоном (target). */
export function scoreSpeech(target: string, heard: string): SpeechScore {
  const targetWords = normalize(target).split(" ").filter(Boolean);
  const heardWords = normalize(heard).split(" ").filter(Boolean);

  // Мультимножество услышанных слов — каждое совпадение «съедает» одно.
  const pool = new Map<string, number>();
  for (const w of heardWords) pool.set(w, (pool.get(w) ?? 0) + 1);

  let matched = 0;
  const words: WordMatch[] = targetWords.map((w) => {
    const left = pool.get(w) ?? 0;
    const ok = left > 0;
    if (ok) {
      pool.set(w, left - 1);
      matched++;
    }
    return { word: w, ok };
  });

  const percent = targetWords.length
    ? Math.round((matched / targetWords.length) * 100)
    : 0;
  return { percent, words, heard: normalize(heard) };
}
