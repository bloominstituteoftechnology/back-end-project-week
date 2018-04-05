const express = require('express');
const session = require('express-session');
const cors = require('cors');

const SECRET = process.env.SECRET;

const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  origin: 'https://boring-pare-625725.netlify.com',
  credentials: true,
};

server.all('*', function(req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.options('*', cors(corsOptions));

server.use(express.json());
server.use(cors(corsOptions));

server.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

routes(server);

module.exports = {
  server,
};
