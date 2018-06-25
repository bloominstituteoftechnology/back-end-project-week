const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/userSchema');
const secret = 'The world is my playground!';

function generateToken(user) {
    const options = {
        expiresIn: '1h'
    };

    const payload = { name: user.username };

    return jwt.sign(payload, secret, options);
}

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.status(400).json('Username already exists.');
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
            res.status(500).json({ Error: error.message });
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
                            res.status(200).json({ token, notes: user.notes });
                            return;
                        }
                        else {
                            res.status(401).json('Invalid credentials.');
                            return;
                        }
                    })
                    .catch(error => {
                        res.status(500).json('An error occurred while validating credentials.');
                    })
            }
            else {
                res.status(401).json('Invalid credentials.');
            }
        })
        .catch(error => {
            res.status(500).json('An error occurred while validating credentials.');
        })
});

module.exports = router; 