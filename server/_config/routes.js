const userRoutes = require('../users/userRoutes');
const noteRoutes = require('../notes/noteRoutes');

module.exports = function(server) {
    server.get('/', (req, res) => {
        res.send('api up and running');
    });

    server.use('/api/users', userRoutes);
    server.use('/api/notes', noteRoutes);
};
