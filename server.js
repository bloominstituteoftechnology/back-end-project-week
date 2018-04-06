const express = require('express');
const session = require('express-session');
const cors = require('cors');

const SECRET = process.env.SECRET;

const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  origin: 'https://awesome-volhard-b3adaf.netlify.com',
  //origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));
// server.options('*', cors());

server.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

const restrictAccess = (req, res, next) => {
  if (req.session.username) next();
  else res.status(404).send({ msg: 'You must log in to view this page.' });
};

server.use('/api/notes', restrictAccess);

routes(server);

module.exports = {
  server,
};
