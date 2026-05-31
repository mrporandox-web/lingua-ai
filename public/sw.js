// Lingua-AI service worker — минимальный offline-first кэш оболочки.
// Цель v1: устанавливаемость PWA + базовый офлайн навигации. БЕЗ кэша API/LLM/TTS.
const CACHE = "lingua-ai-shell-v1";
const SHELL = ["/", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Кэшируем только GET-навигацию по своему origin. API/POST идут в сеть напрямую.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  if (req.mode === "navigate") {
    // network-first для HTML: всегда свежий контент, офлайн — из кэша.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/")))
    );
    return;
  }

  // stale-while-revalidate для статики (_next/static, иконки, шрифты).
  event.respondWith(
    caches.match(req).then((hit) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => hit);
      return hit || fetchPromise;
    })
  );
});
