#!/bin/bash

set -e
set -x

export NVM_DIR="/usr/local/opt/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install 6

rm -Rf client/node_modules
rm -Rf server/node_modules
rm -Rf prizmdoc/node_modules

(cd client && npm install && npm link)
(cd server && npm install && npm link)
(cd prizmdoc && npm install && npm link)

rm -Rf service/node_modules

(cd service && npm install)
(cd service && npm link client)
(cd service && npm link prizmdoc)
(cd service && npm link server)