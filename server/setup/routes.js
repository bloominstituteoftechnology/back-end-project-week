const User = require('./users/User')

module.exports = function(server) {

  server.get('/', function(req, res) {
    res.send({ api: 'up and running' });
  });

  server.post('/api/register', function(req, res) {
      const credentials = req.body;
      const user = new User(credentials);
      user.save().then(inserted => {
          res.status(201).json(inserted);
      })
  })
};
