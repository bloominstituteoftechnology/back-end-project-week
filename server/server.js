const express = require('express');
const mongoose = require('mongoose');

const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

setupMiddleware(server);
setupRoutes(server);

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://localhost/back-end-server')
    .then(console.log('\n=== API connected to back-end-server database ===\n'))
    .catch(err => console.log(err, 'error connecting to database'));

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`\n *** Back-End-API running on port ${port}\n`);
});
