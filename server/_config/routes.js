const userRoutes = require('../../server/userController');

module.exports = function(server) {
    //sanity check route
    server.get('/', function(req, res) {
        res.send({ api: `Server up and running on port ${port}`});
    });

    server.use('/api/users', userRoutes)
};
