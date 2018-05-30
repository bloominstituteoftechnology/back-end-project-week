const express = require('express');

const db = require('./config/db');
const setupMiddleware = require('./config/middleware');
const setupRoutes = require('./config/routes');

const server = express();

db
    .connecTo('backEnd')
    .then(() => console.log('\n ... connected to backend database ... \n'))
    .catch(err => {
        console.log('\n ~~~ Error connecting to backend database ~~~ \n', err)
    });

setupMiddleware(server);
setupRoutes(server);