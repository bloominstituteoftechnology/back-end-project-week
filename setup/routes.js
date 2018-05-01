const User = require('../User/Users');

module.exports = function(server) {
    server.get('/', function(req, res){
        res.send({api: 'up and running'});
    });

    server.post('/back-end/register', function(req, res){
        const credentials = req.body;

        const Users = new User (credentials);
        Users.save().then( inserted => {
            res.status(201).json(inserted);
        });
    });
};