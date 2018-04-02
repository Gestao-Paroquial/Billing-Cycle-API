#!/usr/bin/env sh
set -x

cd /var/www/node_api && \
git pull origin master && \
pm2 restart 0