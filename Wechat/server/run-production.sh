#!/bin/sh

NODE_ENV=production pm2 start server.js -i 0
