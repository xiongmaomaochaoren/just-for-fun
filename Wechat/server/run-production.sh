#/bin/bash

NODE_ENV=production pm2 restart server.js -i 0
