const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const secret = 'The world is my playground!';

function generateToken(user) {
    const options = {};
    const payload = { name: user.username };
    return jwt.sign(payload, secret, options);
};

function errorReturn(error, msg) {
    const fields = ['firstname', 'lastname', 'email', 'username', 'password']
    for (let key in error) {
        for (let field = 0; field < fields.length; field++) {
            if (key === fields[field]) {
                return {
                    path: key,
                    status: 400,
                    message: error[key].message
                }
            }
        }
    }
    return {
        path: null,
        status: 500,
        message: msg
    }
};

router.post('/signup', (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                res.status(400).json(['email', 'This email is already associated to an existing account.']);
                return;
            }
            else {
                User.findOne({ username })
                    .then(user => {
                        if (user) {
                            res.status(400).json(['username', 'That username is taken. Try another.'])
                            return;
                        }
                        else {
                            User.create({ firstname, lastname, email, username, password })
                                .then(user => {
                                    res.status(201).json('The user account was successfullly created.');
                                })
                                .catch(error => {
                                    let errorReceived = errorReturn(error.errors, 'An internal server error occurred while signing up for an account.');
                                    res.status(errorReceived.status).json([errorReceived.path, errorReceived.message]);
                                })
                        }
                    })
            }
        })
        .catch(error => {
            let errorReceived = errorReturn(error.errors, 'An internal server error occurred while signing up for an account.');
            res.status(errorReceived.status).json([errorReceived.path, errorReceived.message]);
        })
});

router.post('/login', (req, res) => {
    const { username, email, password, } = req.body;
    User.findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                user
                    .validatePassword(password)
                    .then(passwordsMatch => {
                        if (passwordsMatch) {
                            const token = generateToken(user);
                            res.status(200).json({ id: user._id, notes: user.notes, token });
                            return;
                        }
                        else {
                            res.status(401).json('Invalid credentials. Try again.');
                            return;
                        }
                    })
                    .catch(error => {
                        let errorReceived = errorReturn(error.errors, 'An internal server error occured while logging in.');
                        res.status(errorReceived.status).json([errorReceived.path, errorReceived.message]);
                    })
            }
            else {
                res.status(401).json('Invalid credentials. Try again.');
            }
        })
        .catch(error => {
            let errorReceived = errorReturn(error.errors, 'An internal server error occured while logging in.');
            res.status(errorReceived.status).json([errorReceived.path, errorReceived.message]);
        })
});

module.exports = router; 