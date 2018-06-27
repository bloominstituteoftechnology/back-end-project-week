const router = require('express').Router();

const User = require('./userModel');
const jwt = require('jsonwebtoken');
const secret = 'supersecretsauce';

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken;
            if (err) {
                return res.status(401).json({ errorMessage: 'Please sign in' })
            }

            next();
        })
    } else {
        res.status(401).json({ errorMessage: 'Please sign in' });
    }
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

module.exports = router;