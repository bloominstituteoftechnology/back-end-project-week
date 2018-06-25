const NoteRoutes = require('../notes/NoteRoutes');
const UserRoutes = require('../users/UserRoutes');

module.exports = function (server) {
  server.get('/', function (req, res) {
    res.send({ api: 'up and running' });
  });
  server.use('/notes', NoteRoutes);
  server.use('/users', UserRoutes);
};