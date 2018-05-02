const User = require('./UserModel');
const bcrypt = require('bcrypt');

module.exports = function(server) {
    
    server.post('/api/register', (req, res) => {
        const user = new User(req.body);
        user
        .save()
        .then(newUser => {
            req.session.username = newUser.username;
            req.session.userId = newUser._id;
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({msg:err});
        });
    });

    server.put('/api/update', (req, res) => {
        const { username, notes } = req.body;
        console.log(req.session.userId);
        User
        .findByIdAndUpdate(req.session.userId, { notes })
        .then (response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ msg: 'There was an error updating entry' });
        });


    });

    server.post('/api/login', (req, res) => {
        const { username, password } = req.body;
        User
        .findOne({ username })
        .then(user => {
            if(user) {
               
                bcrypt.compare(password, user.password, function(err, valid) {
                  
                    if (valid) {
                        req.session.username = username;
                        req.session.userId = user._id;
                        res.status(200).json({msg:`logged in as ${username}`})
                    } else {
                        res.status(422).json({err: 'Username or password incorrect'});
                    }

                });
            }
        })
        .catch(err => {
        
            res.status(500).json({err:'There was an error'});
        });
    });
};
