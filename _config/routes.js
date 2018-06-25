const noteRoutes = require('../notes/noteRoutes');
const userRoutes = require('../users/userRoutes');

module.exports = function (server) {
    server.get('/', function (req, res) {
        res.send({ api: 'up and running' });
    });
    server.use('/notes', noteRoutes);
    server.use('/users', userRoutes);
};
