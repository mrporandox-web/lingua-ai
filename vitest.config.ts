import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Тесты движка — чистые функции, среда node (без DOM). Алиас @/ → src/,
// как в tsconfig, чтобы импорты совпадали с боевым кодом.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
