// POST /api/tts/prebake — dev-утилита: синтезирует все статичные фразы урока
// в public/tts/*.wav + manifest.json. Запускать разово локально, когда
// поменялся набор фраз. На проде закрыт (read-only FS + не нужен в рантайме).

import { NextResponse } from "next/server";
import { hasGeminiKey } from "@/lib/tts/gemini";
import { prebakeAll } from "@/lib/tts/prebake";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(): Promise<NextResponse> {
  // Только для локальной разработки — на проде запекание не нужно и FS read-only.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "disabled in production" }, { status: 404 });
  }
  if (!hasGeminiKey()) {
    return NextResponse.json({ error: "no GEMINI_API_KEY" }, { status: 400 });
  }
  const result = await prebakeAll();
  return NextResponse.json(result);
}
