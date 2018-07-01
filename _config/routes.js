const userRoutes = require('../users/userRoutes');
const authRoutes = require('../auth/authRoutes');
const noteRoutes = require('../notes/notesRoutes')

module.exports = function (server) {
  server.get('/', function (req, res) {
    res.send({
      api: 'up and running'
    });
  });
  server.use('/api/notes', noteRoutes)
  server.use('/api/users', userRoutes);
  server.use('/api/auth', authRoutes);

};