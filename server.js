const express = require('express');
const session = require('express-session');
const cors = require('cors');

const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(
  session({
    secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
    resave: false,
    saveUninitialized: false,
  })
);

routes(server);

module.exports = {
  server,
};
