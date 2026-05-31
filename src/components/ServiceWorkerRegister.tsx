"use client";

import { useEffect } from "react";

/**
 * Регистрирует service worker для PWA. Только в проде —
 * в dev SW мешает HMR. Монтируется один раз в RootLayout.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          // Регистрация необязательна — приложение работает и без SW.
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
