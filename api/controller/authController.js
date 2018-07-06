const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');

const generateToken = user => {
    const options = {
        expiresIn: '24h'
    };
    const payload = { id: user._id };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

router.route('/register')
    .post((req, res) => {
        User.create(req.body)
            .then(user => {
                const token = generateToken(user);
                res.status(201).json({ token });
            })
            .catch(err => res.status(500).json({ error: err.message }));
    });

router.route('/login')
    .post((req, res) => {
        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if (user === null) {
                    return res.status(404).json({ error: `Invalid credentials.`});
                }
                user.checkPassword(password)
                    .then(match => {
                        if (match) {
                            const token = generateToken(user);
                            return res.json({ token });
                        } else {
                            return res.status(401).json({ error: `Invalid credentials.`});
                        }
                    })
                    .catch(err => res.status(500).json({ error: `Error processing request.`}));
            })
            .catch(err => res.status(500).json({ error: `Error processing request.`}));
    });

module.exports = router;