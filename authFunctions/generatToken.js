require('dotenv').config();

const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        roles: ['processes'],
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '15m',
    };

    return jwt.sign(payload, secret, options);
}

module.exports = generateToken;