const authRoutes = require('../auth/authRoutes'); 
const userRoutes = require('../users/userRoutes'); 

module.exports = function(server) {
    // Sanity check route 
    server.get('/', function(req, res) {
        res.json({API: 'It is up and running!'}); 
    }); 

    server.use('/api/auth', authRoutes); 
    server.use('/api/users/', userRoutes); 
}; 

