const User = require('../Models/userModel');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, encryptedPassword: password });
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(savedUser);
    });
};

const userLogin = (req, res) => {
    const { username , password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid Username/Password'});
            return;
        }
        if (user === null) {
            res.status(422).json({ error: 'No user with that username in our DB' });
            return;
        }
        user.checkPassword(password, (nonMatch, hashMatch) => {
            if (nonMatch !== null) {
                res.status(422).json({ error: 'passwords dont match' });
                return;
            }
            if (hashMatch) {
                req.session.username = user.username;
                res.status(200).send({ success: true });
            }
        });
    });
};

module.exports = {
    userLogin,
    createUser
};