#!/usr/bin/env bash
# Cloudflare Tunnel для Lyra (ai-lyra.ru).
#
# ЗАЧЕМ: Timeweb режет ВХОДЯЩИЕ соединения с зарубежных IP (Cloudflare → origin
# даёт error 525 при Full и флаки-чёрный экран при Flexible). Туннель переворачивает
# направление: сервер сам устанавливает ИСХОДЯЩЕЕ соединение до Cloudflare (а исходящие
# наружу у Timeweb работают — через них идут apt/git/curl). CF больше не ломится внутрь
# через фильтр → проблема исчезает целиком. Бонус: трафик CF↔origin снова шифрован.
#
# ПЕРЕД запуском (один раз, в дашборде Cloudflare):
#   Zero Trust → Networks → Tunnels → Create a tunnel → Cloudflared →
#   назови "lyra" → скопируй INSTALL TOKEN (длинная строка после `service install`).
#   Затем на вкладке Public Hostnames добавь:
#     - Hostname: ai-lyra.ru      → Service: HTTP  → localhost:80
#     - Hostname: www.ai-lyra.ru  → Service: HTTP  → localhost:80
#   (CF сам создаст нужные CNAME; старую A-запись @ → 147.45.146.74 после проверки удали.)
#
# ЗАПУСК на сервере (в веб-консоли Timeweb):
#   bash scripts/cf-tunnel-setup.sh <INSTALL_TOKEN>
set -euo pipefail

TOKEN="${1:-${TOKEN:-}}"
if [ -z "$TOKEN" ]; then
  echo "❌ Нужен install-токен туннеля первым аргументом."
  echo "   CF Zero Trust → Networks → Tunnels → создай туннель → скопируй токен."
  exit 1
fi

echo "==> [1/2] Ставлю cloudflared (apt-репозиторий Cloudflare)"
if ! command -v cloudflared >/dev/null 2>&1; then
  mkdir -p /usr/share/keyrings
  curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg -o /usr/share/keyrings/cloudflare-main.gpg
  echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" \
    > /etc/apt/sources.list.d/cloudflared.list
  apt-get update -y
  apt-get install -y cloudflared
fi

echo "==> [2/2] Регистрирую туннель как systemd-сервис"
# Снести прежнюю установку сервиса, если была (идемпотентность):
cloudflared service uninstall 2>/dev/null || true
cloudflared service install "$TOKEN"
systemctl enable cloudflared 2>/dev/null || true
systemctl restart cloudflared 2>/dev/null || true

echo ""
echo "============================================================"
echo " ГОТОВО. Статус: systemctl status cloudflared"
echo " В CF-дашборде туннель 'lyra' должен стать Healthy за ~10 сек."
echo " Origin отдаёт http://localhost:80 (Caddy → Next:3000)."
echo " Проверь: https://ai-lyra.ru  (теперь через туннель, без inbound-фильтра)"
echo "============================================================"
