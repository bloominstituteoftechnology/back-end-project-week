const jwt = require('jsonwebtoken');
const jwtkey = require('../_secrets/keys').jwtkey;

module.exports = {
    authenticate,
    getToken,
};

function authenticate(req, res, next) {
    const token = req.get("Authorization");

    if (token) {
        jwt.verify(token, jwtkey, (arr, decoded) => {
            if (arr) return res.status(401).json(err);

            req.decoded = decoded;

            next();
        })
    } else {
        return res.status(401).json({
            error: 'No token provided, must be set on the Authorization Header',
        });
    }
}

function getToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, jwtkey, options);
}