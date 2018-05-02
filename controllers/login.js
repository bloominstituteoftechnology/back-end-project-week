const jwt = require('jsonwebtoken');
const { mysecret } = require('../config');
const User = require('../models/UserModel');

const login = (req, res) => {
    const { username, password } = req.body;
    User
        .findOne( { username }, (error, user) => {
            if (error) {
                return res.status(403).json({ error: 'Invalid Username/Password'});
            }
            if (user === null) {
                return res.status(422).json({ error: 'No user with that username was found in the database'});
            }
            user.checkPassword(password, (nonmatch, hashMatch) => {
                if (nonmatch !== null) {
                    return res.status(422).json({ error: 'Passwords dont match'});
                }
                if (hashMatch) {
                    const payload = {
                        username: user.username
                    };
                    const token = jwt.sign(payload, mysecret);
                    let uid = user.id;
                    console.log(uid);
                    res.status(200).json({ token, uid });
                }
            });
        });
};

module.exports = {
    login
};