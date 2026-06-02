import type { CapacitorConfig } from "@capacitor/cli";

// Нативная обёртка Lyra (Capacitor). Продакшен-подход: UI зашит в приложение
// (static-export в out/), грузится мгновенно и без сети. Серверные данные
// (TTS-генерация, Claude) уходят на удалённый Vercel — см. src/lib/api.ts.
// Сборка натива: scripts/cap-build.sh (export → out → cap copy).
const config: CapacitorConfig = {
  appId: "ai.lyra.app",
  appName: "Lyra",
  webDir: "out",
};

export default config;
