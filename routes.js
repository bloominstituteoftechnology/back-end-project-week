const User = require('./UserModel');
const bcrypt = require('bcrypt');

module.exports = function(server) {
    
    server.post('/api/register', (req, res) => {
        const user = new User(req.body);
        user
        .save()
        .then(newUser => {
            console.log(newUser);
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({msg:err});
        });
    });

    server.post('/api/note', (req, res) => {

    });

    server.post('/api/login', (req, res) => {
        const { username, password } = req.body;
        User
        .find({username})
        .then(user => {
            if(user) {
                bcyrpt.compare(password, user.password, (err, valid) => {
                    if (valid) {
                        req.session.username = username;
                        res.status(200).json({msg:`logged in as ${username}`})
                    } else {
                        req.status(422).json({err: 'Username or password incorrect'});
                    }

                });
            }
        })
        .catch(err => {
            res.status(500).json({err:err});
        });
    });
};
