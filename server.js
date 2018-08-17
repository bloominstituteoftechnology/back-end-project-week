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
        console.log('API connected to the database server.');
        server.listen(port, () => {
            console.log(`API running on port ${port}.`);
        });
    })
    .catch(error => {
        console.log('An error occurred while trying to connect to the MongoDB.', error);
    })