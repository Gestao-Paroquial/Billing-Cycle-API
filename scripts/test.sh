#!/usr/bin/env sh
set -x

export NODE_ENV=production
export NVM_BIN=~/.nvm/versions/node/v8.9.4/bin

. /root/.nvm/nvm.sh
cd /var/www/node_api && \
git pull origin master 