const express = require('express');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const server = express();
const port = process.env.PORT || 1433;

setupMiddleware(server);
setupRoutes(server);

db.connectTo()
    .then(() => {
        console.log('\n=== API connected to the back-end database. ===\n');
        server.listen(port, () => {
            console.log(`\n=== API running on port ${port}. ===\n`);
        });
    })
    .catch(error => {
        console.log('\n*** An error occurred while trying to connect to the MongoDB.', error);
    })