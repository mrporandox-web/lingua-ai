// POST /api/tts — серверная озвучка английской фразы через Gemini TTS (Фаза 4).
//
// Контракт НИКОГДА не падает: нет ключа / пустой текст / ошибка Gemini → 204 No Content,
// и клиент тихо деградирует (listening просто молчит, урок не ломается).
// Успех → отдаём готовый WAV (audio/wav), <audio> играет без плясок.
//
// Runtime = nodejs (НЕ edge): собираем WAV через Buffer, нужен полный Node.
// Ключ GEMINI_API_KEY берётся из process.env (мост прокидывает) и НИКОГДА не уходит
// в браузер — синтез только тут, на сервере.

import { NextResponse } from "next/server";
import { synthesizeWav, hasGeminiKey } from "@/lib/tts/gemini";

export const runtime = "nodejs";
// Озвучка зависит от тела запроса — кэшировать роут нельзя.
export const dynamic = "force-dynamic";

/** Тело запроса: фраза для озвучки. */
interface TtsBody {
  text?: unknown;
}

/** Пустой ответ-деградация: 204, клиент трактует как «озвучки нет». */
function silence(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: Request): Promise<NextResponse> {
  // Нет ключа — даже не дёргаем сеть, сразу тихо деградируем.
  if (!hasGeminiKey()) return silence();

  let text = "";
  try {
    const body = (await req.json()) as TtsBody;
    if (typeof body.text === "string") text = body.text;
  } catch {
    return silence(); // битый JSON — деградация, не 500
  }

  if (!text.trim()) return silence();

  const wav = await synthesizeWav(text);
  if (!wav) return silence(); // Gemini отказал / пусто — тихо молчим

  // Готовый WAV. Кэш на клиенте — наш хук (blob), здесь явно no-store.
  return new NextResponse(new Uint8Array(wav), {
    status: 200,
    headers: {
      "Content-Type": "audio/wav",
      "Content-Length": String(wav.length),
      "Cache-Control": "no-store",
    },
  });
}
