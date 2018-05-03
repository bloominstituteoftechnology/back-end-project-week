const User = require('./UserModel');
const bcrypt = require('bcrypt');
const session = require('express-session');

module.exports = function(server) {

    // server.get('/api/cookie', (req, res) => {
    //     req.session.test = 'There should be a cookie';
    //     console.log('have a cookie');
    //     res.json({msg:'Cookie time'});
    // })

    server.get('/api/logout', (req, res) => {
        if (req.session)
            session.destroy((err) => {
                if (err)
                    res.ststus(500).json({msg: 'logout failed'});
                else
                    res.status(200).json({msg: 'Successfully logged out'});
            });
    });
    
    server.post('/api/register', (req, res) => {
        const user = new User(req.body);
        user
        .save()
        .then(newUser => {
            console.log('here');
            req.session.username = newUser.username;
            req.session.userId = newUser._id;
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({error: 'Could not create new user.'});
        });
    });
    //need to check to make sure that the user is logged in when this endpoint is hit, custom middleware
    // check if (req.session && req.session.name) next()
    server.put('/api/update', (req, res) => {
        const { username, notes } = req.body;
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
               consol.log('user');
                bcrypt.compare(password, user.password, function(err, valid) {                 
                    if (valid) {
                        req.session.username = username;
                        req.session.userId = user._id;
                        res.status(200).json(user)
                    } else {
                        res.status(422).json({error: 'Username or password incorrect'});
                    }
                });
            }
        })
        .catch(err => {
        
            res.status(500).json({error:'There was an error'});
        });
    });

    server.post('/api/username', (req, res) => {
        const { username } = req.body;
        User
        .findOne({username})
        .then(response => {
            if (response)
                res.send(true);
            else   
                res.send(false);
        })
        .catch(err => {
            console.log('here');
            res.send({error:err});

        })
    })
};
