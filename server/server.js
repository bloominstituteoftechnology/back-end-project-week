const express = require('express');
const port = process.env.PORT || 3333;

const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const db = require('./_config/db');


const server = express();

setupMiddleware(server);
setupRoutes(server);

db.connectTo('dbLambdaNotes')
  .then(() => {
    console.log('\n... API Connected to dbLambdaNotes Database ...\n');
    server.listen(`${port}`, () =>
      console.log(`API running on port ${port}`)
    );
  })
  .catch(err => {
    console.log('\n*** ERROR Connecting to MongoDB, is it running? ***\n', err);
  });



