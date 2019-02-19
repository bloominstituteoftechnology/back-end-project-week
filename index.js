const cors = require('cors');
require('dotenv').config();
const express = require('express');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs')
const session = require('express-session')
const listsRouter = require('./routers/listsRouter');
const notesRouter = require('./routers/notesRouter');
const usersRouter = require('./routers/usersRouter');
const secret = 'shhhthisissecret';

server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
server.use('/api/notes', notesRouter);
server.use('/api/lists', listsRouter);
server.use('/api/users', usersRouter);


 function protect(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Invalid token'}); 
    } else {
      next();
    }
  });
} 
//************************************************** */
 function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options);
}
 
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));