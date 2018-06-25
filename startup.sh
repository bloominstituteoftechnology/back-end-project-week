#!/bin/sh

if [ "$NODE_ENV" = "production" ]; then
  echo "starting with 'node server.js'"
  node server.js;
else
  echo "starting with 'nodemon server.js'"
  nodemon server.js;
fi
