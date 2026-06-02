import type { NextConfig } from "next";

// Два режима сборки одной кодовой базой:
//  • Веб (Vercel): обычный SSR + API-роуты (по умолчанию).
//  • Натив (Capacitor): CAPACITOR_BUILD=1 → static-export в out/, UI зашит в
//    приложение и грузится без сети; API/данные ходят на удалённый Vercel
//    (NEXT_PUBLIC_API_BASE). Это чинит «белый экран без сети» в нативе.
const isCapacitor = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isCapacitor
    ? {
        output: "export",
        images: { unoptimized: true }, // export не умеет оптимизатор картинок
      }
    : {}),
};

export default nextConfig;
