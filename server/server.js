const server = require('express')();
const setupMiddleware = require('./middleware').server;
const setupRoutes = require('./routes');

setupMiddleware(server);
setupRoutes(server);

module.exports = {
  server
};
