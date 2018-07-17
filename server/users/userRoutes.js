const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

const secret = 'Derrick is really Kevin';

function generateToken(username) {
    const options = { expiresIn: '1h' };
    const payload = { username };
    return jwt.sign(payload, secret, options);
}

router.post('/register', function(req, res) {
    User.create(req.body)
        .then(({ username }) => {
            const token = generateToken(username);
            res.status(201).json({ username, token });
        })
        .catch();
});

module.exports = router;
