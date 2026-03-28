#!/bin/sh
set -e

# Sinh file config.js từ env vars lúc container khởi động
cat <<EOF > /usr/share/nginx/html/config.js
window.__ENV__ = {
  API_URL: "${API_URL:-}",
  API_KEY: "${API_KEY:-}",
  APP_ENV: "${APP_ENV:-production}"
};
EOF

exec nginx -g 'daemon off;'