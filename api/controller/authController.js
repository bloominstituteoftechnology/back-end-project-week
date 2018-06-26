const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../model/User.js');

const generateToken = user => {
    const options = {
        expiresIn: '24h'
    };
    const payload = { email: user.email, fistName: user.firstName };
    return jwt.sign(payload, process.env.JWT_secret, options);
}

router.route('/register')
    .post((req, res) => {
        User.create(req.body)
            .then(({ email, firstName }) => {
                const token = generateToken({ email, firstName });
                res.status(201).json({ email, firstName, token });
            })
            .catch(err => res.status(500).json({ error: err.message }));
    });

router.route('/login')
    .post((req, res) => {
        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if (user === null) {
                    return res.status(422).json({ error: `Invalid credentials.`});
                }
                user.checkPassword(password)
                    .then(match => {
                        if (match) {
                            const token = generateToken(user);
                            return res.json({ message: `Welcome ${user.firstName}`, token});
                        } else {
                            return res.status(401).json({ error: `Invalid credentials.`});
                        }
                    })
                    .catch(err => res.status(500).json({ error: `Error processing request.`}));
            })
            .catch(err => res.status(500).json({ error: `Error processing request.`}));
    });

module.exports = router;