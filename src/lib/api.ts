// База для серверных API-роутов.
//  • Веб (Vercel): относительный путь — API живёт в том же origin.
//  • Натив (Capacitor, static-export): UI зашит в приложение, локального /api
//    нет → зовём удалённый Vercel. База инлайнится на сборке через
//    NEXT_PUBLIC_API_BASE (см. scripts/cap-build.sh).
import { Capacitor } from "@capacitor/core";

const REMOTE = "https://lingua-ai-neon-delta.vercel.app";

export function apiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  if (base) return base + path;
  // подстраховка: в нативе без env всё равно нужен абсолютный backend
  if (typeof window !== "undefined" && Capacitor.isNativePlatform()) {
    return REMOTE + path;
  }
  return path; // веб — относительный
}
