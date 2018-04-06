const express = require('express');
const session = require('express-session');
const routes = require('./routes');
//const config = require('config.js')
const cors = require('cors');
const mongoose = require('mongoose');
const corOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const server = express();

server.use(express.json());
server.use(cors(corOptions));
server.use(session({
  secret: 'mBXuM9c1iMqwdzYClsGj7qAHVJKVi5YS',
  resave: true,
  saveUninitialized: false,
}));

const auth = (req,res, next) => {
  if (req.session.username) next();
  else res.status(400).send({ msg: 'Authorized Users only'});
};

server.use('/api/notes', auth);

/* server.get('/', (req, res) => {
  noteSchema.find({}, (err, database) => {
    if (err) {
      res.status(500);
      res.json(err);
    } else {
      res.json(database);
    }
  });
});
 */

routes(server);



module.exports = { server, };