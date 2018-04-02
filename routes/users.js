const express = require('express');
const bcrypt = require('bcrypt');
const { authUser, sendUserError } = require('../middleware');

const { STATUS_USER_ERROR, BCRYPT_COST } = require('../config.json');

const User = require('../models/users');

const router = express.Router();

router.get('/', authUser, (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if(!user) {
                sendUserError('Username or password does not match', res);
            } else {
                bcrypt.compare(password, user.password)
                    .then(response => {
                        req.session.loggedIn = user._id;
                        res.send({ success: true });
                    })
                    .catch(err => {
                        throw new Error(err);
                    });
            }
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

module.exports = router;