const express = require('express');
const session = require('express-session');
//const cors = require('cors');

const SECRET = process.env.SECRET;

const routes = require('./api/routes/routes');

const server = express();
// const corsOptions = {
//   origin: 'https://boring-pare-625725.netlify.com',
//   credentials: true,
// };

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'null');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

server.use(express.json());
//server.use(cors(corsOptions));
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
