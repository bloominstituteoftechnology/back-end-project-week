const User = require('./User/User.js');
const bcrypt = require('bcrypt');
const session = require('express-session');

function authenticate(req, res, next) {
    if (req.session && req.session.userId)
        next();
    else
        res.json({ msg:'You must be logged in to do this function.' })
}

module.exports = function(server) {


    server.get('/api/logout', (req, res) => {
        if (req.session)
            req.session.destroy((err) => {
                if (err)
                    res.ststus(500).json({msg: 'logout failed'});
                else
                    res.status(200).json({msg: 'Successfully logged out'});
            });
        else
            res.send({msg: 'Not Logged In'});
    });
    
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
            res.status(500).json({error: 'Could not create new user.'});
        });
    });
    
    server.put('/api/update', authenticate, (req, res) => {
        const { notes } = req.body;
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

    //This end point checks to see if a username exists in the db. returns true if it does else false
    server.post('/api/username', (req, res) => {
        const { username } = req.body;
        User
        .findOne({username})
        .then(response => {
            if (response)
                res.json(User);
            else   
                res.send(false);
        })
        .catch(err => {
            console.log('here');
            res.send({error:err});

        })
    })
};