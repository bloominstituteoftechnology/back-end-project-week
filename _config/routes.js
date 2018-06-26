const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');


module.exports = function (server) {
  server.get('/', function (req, res) {
    res.send({
      api: 'up and running'
    });
  });

  server.use('/api/users', userRoutes);
  server.use('/api/auth', authRoutes);

};