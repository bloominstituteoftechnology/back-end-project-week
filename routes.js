const User = require('./UserModel');

const seesion = require('express-sessions');

module.exports = function(server) {
    
    server.post('/api/register', (req, res) => {
        const user = new User(req.body);
        console.log(user);
        user.save()
        .then(newUser => {
            console.log(newUser);
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({msg:'there was an error'});
        });
    });

    server.post('/api/note', (req, res) => {

    });

    server.post('/api/login', (req, res) => {

    })
}
