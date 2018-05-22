#!/usr/bin/env sh
set -x

. /root/.nvm/nvm.sh
cd /var/www/node_api && \
git pull origin master && \
npm install --only=production && \
pm2 restart backend
