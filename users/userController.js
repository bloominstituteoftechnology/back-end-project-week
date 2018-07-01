const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./userModel');
const secret = 'supersecretsauce';

function generateToken(user) {
    const options = {
        expiresIn: '1h',
    };
    const payload = { name: user.username };

    return jwt.sign(payload, secret, options);
}

// base route = '/user'

router.route('/register')
    .post((req, res) => {
        let { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ errorMessage: 'Please provide a username and a password' });
        }
        User.findOne({ username: username })
            .then(existingUser => {
                if (existingUser) {
                    res.status(400).json({ errorMessage: 'Username is not unique' });
                } else {
                    User.create({ username, password })
                        .then(newUser => {
                            res.status(201).json(newUser);
                        })
                        .catch(err => {
                            res.status(500).json({ errorMessage: 'Could not create new user' })
                        })
                }
            })
            .catch(err => res.status(500).json({ errorMessage: 'Could not look for existing user' }))
    })

router.route('/login')
    .post((req, res) => {
        let { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ errorMessage: 'Please provide a username and a password' });
        } else {
            User.findOne({ username })
                .then(user => {
                    if (user) {
                        user.validatePassword(password)
                            .then(passwordsMatch => {
                                if (passwordsMatch) {
                                    const token = generateToken(user);

                                    res.status(200).json({ user, token })
                                } else {
                                    res.status(401).json({ errorMessage: 'Invalid credentials' })
                                }
                            })
                            .catch(err => {
                                res.status(500).json({ errorMessage: 'Error comparing password' })
                            });
                    } else {
                        res.status(401).send('invalid credentials');
                    }
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: 'Could not findOne user' })
                })
        }

    })

module.exports = router;