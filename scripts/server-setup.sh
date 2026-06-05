#!/usr/bin/env bash
# ============================================================
# Lyra — установка сервера с нуля (Ubuntu 24.04, Timeweb VPS).
# Идемпотентно: можно гонять повторно (это же и редеплой).
# Запуск: bash server-setup.sh   (от root, по SSH или в веб-консоли)
# ============================================================
set -euo pipefail

DOMAIN="ai-lyra.ru"
APP_DIR="/opt/lyra"
REPO="https://github.com/mrporandox-web/lingua-ai.git"
PORT=3000

echo "==> [1/8] swap 2G (нужно для сборки Next на 1GB RAM)"
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> [2/8] базовые пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl git ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https

echo "==> [3/8] Node 24"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | sed 's/v//;s/\..*//')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install -y nodejs
fi
corepack enable
corepack prepare pnpm@latest --activate

echo "==> [4/8] Caddy (авто-HTTPS Let's Encrypt)"
if ! command -v caddy >/dev/null 2>&1; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -y && apt-get install -y caddy
fi

echo "==> [5/8] код из GitHub"
mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" fetch --all -q && git -C "$APP_DIR" reset --hard origin/main
else
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"

echo "==> [6/8] сборка"
pnpm install --frozen-lockfile
pnpm build

echo "==> [7/8] systemd-сервис lyra"
cat >/etc/systemd/system/lyra.service <<EOF
[Unit]
Description=Lyra (Next.js)
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=$PORT
ExecStart=$(command -v pnpm) start
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable lyra
systemctl restart lyra

echo "==> [8/8] Caddy reverse-proxy + авто-SSL для $DOMAIN"
cat >/etc/caddy/Caddyfile <<EOF
$DOMAIN, www.$DOMAIN {
  encode zstd gzip
  reverse_proxy 127.0.0.1:$PORT
}
EOF
systemctl restart caddy

echo ""
echo "============================================================"
echo " ГОТОВО. Сервис: systemctl status lyra"
echo " Проверь: https://$DOMAIN  (SSL поднимется после A-записи домена)"
echo "============================================================"
