const User = require('./users/User');
const jwt = require('jsonwebtoken');

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    email: user.email,
    iat: timestamp
  };
  const secret = 'I love Sci Fi';
  const options = { expiresIn: 300000 }; // 300,000 milliseconds or 5 minutes
  return jwt.sign(payload, secret, options);
}

module.exports = function(server) {
  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
    const credentials = req.body;
    const user = new User(credentials);
    user.save().then(inserted => {
      const token = makeToken(inserted);
      res.status(201).json(token);
    });
  });
};
