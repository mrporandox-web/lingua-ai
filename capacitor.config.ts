import type { CapacitorConfig } from "@capacitor/cli";

// Конфиг нативной обёртки Lyra (Capacitor). Прототип: нативная оболочка грузит
// живой прод-сайт (server.url) — так весь Next.js/API работает как есть, а
// нативные плагины (on-device речь) доступны через мост Capacitor.
// Для офлайн-сборки позже перейдём на static-export в webDir.
const config: CapacitorConfig = {
  appId: "ai.lyra.app",
  appName: "Lyra",
  webDir: "public", // плейсхолдер; при server.url контент грузится с прода
  server: {
    url: "https://lingua-ai-neon-delta.vercel.app",
    cleartext: false,
  },
  plugins: {
    SpeechRecognition: {
      // разрешения и язык запрашиваем в рантайме
    },
  },
};

export default config;
