const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');
const secret = 'The world is my playground!';

function generateToken(user) {
    const options = {
        expiresIn: '1h'
    };
    const payload = { name: user.username };
    return jwt.sign(payload, secret, options);
};

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user) {
                res.status(400).json('That username is taken. Try another.');
                return;
            }
            else {
                User.create({ username, password })
                    .then((user) => {
                        res.status(201).json({ username: user.username, notes: user.notes });
                    })
                    .catch(error => res.status(500).json({ Error: error.message }));
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while signing up for an account.');
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
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
                        res.status(500).json('An internal server error occurred while validating credentials.');
                    })
            }
            else {
                res.status(401).json('Invalid credentials. Try again.');
            }
        })
        .catch(error => {
            res.status(500).json('An internal server error occurred while validating credentials.');
        })
});

module.exports = router; 