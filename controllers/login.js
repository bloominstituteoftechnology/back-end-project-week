const jwt = require('jsonwebtoken');
const { mysecret } = require('../config');
const User = require('../models/UserModel');

const login = (req, res) => {
    const { username, password } = req.body;
    User
        .findOne( { username }, (error, user) => {
            if (error) {
                res.status(403).json({ error: 'Invalid Username/Password'});
                return;
            }
            if (user === null) {
                res.status(422).json({ error: 'No user with that username was found in the database'});
                return;
            }
            user.checkPassword(password, (nonmatch, hashMatch) => {
                if (nonmatch !== null) {
                    res.status(422).json({ error: 'Passwords dont match'});
                    return;
                }
                if (hashMatch) {
                    const payload = {
                        username: user.username
                    };
                    const token = jwt.sign(payload, mysecret);
                    res.json({ token });
                }
            });
        });
};

module.exports = {
    login
};