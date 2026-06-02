#!/usr/bin/env bash
# Сборка нативных бандлов (Capacitor) из static-export веб-приложения.
#  • Исключает src/app/api на время export (роуты не статичны; в нативе не нужны
#    — приложение зовёт удалённый Vercel через NEXT_PUBLIC_API_BASE).
#  • CAPACITOR_BUILD=1 → next.config включает output:"export" → out/.
#  • cap copy переносит out/ в нативные iOS/Android проекты.
set -euo pipefail
cd "$(dirname "$0")/.."

API="src/app/api"
BAK="/tmp/lingua-api-excluded-$$"
restore() { [ -d "$BAK" ] && mv "$BAK" "$API" 2>/dev/null || true; }
trap restore EXIT

API_BASE="${NEXT_PUBLIC_API_BASE:-https://lingua-ai-neon-delta.vercel.app}"

echo "→ исключаю $API на время export"
mv "$API" "$BAK"

echo "→ static-export (CAPACITOR_BUILD=1, API_BASE=$API_BASE)"
CAPACITOR_BUILD=1 NEXT_PUBLIC_API_BASE="$API_BASE" pnpm build

restore; trap - EXIT
echo "→ восстановил $API"

echo "→ cap copy (out/ → нативные бандлы)"
npx --yes cap copy ios 2>/dev/null || echo "  (ios не настроен — пропуск)"
npx --yes cap copy android 2>/dev/null || echo "  (android не настроен — пропуск)"

echo "✓ нативные бандлы обновлены из out/"
