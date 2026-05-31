// Gemini TTS — серверная озвучка английских фраз для listening.
//
// Почему так: Gemini TTS отдаёт СЫРОЙ PCM (audio/L16, 16-bit, 24kHz, mono),
// который браузер сам не сыграет. Поэтому на сервере прицепляем 44-байтный
// WAV-заголовок и возвращаем готовый WAV — <audio> его проигрывает без плясок.
//
// Ключ GEMINI_API_KEY берётся из process.env (мост прокидывает) и НИКОГДА
// не уходит в браузер: вызов только здесь, на сервере.

const TTS_MODEL = "gemini-2.5-flash-preview-tts";
const DEFAULT_VOICE = "Kore"; // спокойный нейтральный голос, хорош для учебных фраз
const PCM_RATE = 24000; // Gemini TTS всегда отдаёт 24kHz mono 16-bit
const PCM_BITS = 16;
const PCM_CHANNELS = 1;

/** Есть ли ключ Gemini в окружении сервера. */
export function hasGeminiKey(): boolean {
  return typeof process.env.GEMINI_API_KEY === "string" && process.env.GEMINI_API_KEY.length > 0;
}

/** Собрать 44-байтный WAV-заголовок под известные параметры PCM от Gemini. */
function wavHeader(pcmLength: number): Buffer {
  const byteRate = (PCM_RATE * PCM_CHANNELS * PCM_BITS) / 8;
  const blockAlign = (PCM_CHANNELS * PCM_BITS) / 8;
  const buf = Buffer.alloc(44);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + pcmLength, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); // размер fmt-чанка
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(PCM_CHANNELS, 22);
  buf.writeUInt32LE(PCM_RATE, 24);
  buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(PCM_BITS, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(pcmLength, 40);
  return buf;
}

/**
 * Озвучить английский текст. Возвращает WAV-байты (Buffer) или null при любой
 * ошибке — вызывающий роут не должен падать, listening деградирует мягко.
 */
export async function synthesizeWav(text: string): Promise<Buffer | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const clean = text.trim().slice(0, 300); // потолок: не жжём токены на гигантских строках
  if (!clean) return null;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${key}`;
  const body = {
    contents: [{ parts: [{ text: `Say clearly and naturally: ${clean}` }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: DEFAULT_VOICE } },
      },
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { inlineData?: { data?: string } }[] } }[];
    };
    const b64 = json.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!b64) return null;

    const pcm = Buffer.from(b64, "base64");
    if (pcm.length === 0) return null;

    return Buffer.concat([wavHeader(pcm.length), pcm]);
  } catch {
    return null;
  }
}
