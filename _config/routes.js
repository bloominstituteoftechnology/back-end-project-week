const NoteRoutes = require('../notes/NoteRoutes');
const UserRoutes = require('../users/UserRoutes');
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.secret;

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Unauthorized!' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'you shall not pass!' });
  }
}

module.exports = function (server) {
  server.get('/', function (req, res) {
    res.send({ api: 'up and running' });
  });
  server.use('/notes', restricted, NoteRoutes);
  server.use('/users', UserRoutes);
};