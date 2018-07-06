const express = require('express');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const server = express();

setupMiddleware(server);
setupRoutes(server);

db.connectTo('back-end-server')
    .then(() => {
        console.log('\n=== API connected to the back-end database. ===\n');
        server.listen(1433, () => {
            console.log('\n=== API running on port 1433. ===\n');
        });
    })
    .catch(error => {
        console.log('\n*** Error connecting to MongoDB! Is it running?', error);
    })