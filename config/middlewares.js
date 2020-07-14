const jwt = require('jsonwebtoken');

const jwtKey = require('../_sercrets/keys').jwtKey

module.exports = {
    authenticate,
    generateToken
}

function authenticate(req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            if(err) {
                return res.status(401).json(err);
            }
            req.decoded = decoded;

            next();
        })
    } else {
        return res.status(401).json({
            error: 'No token provided, must be set on the Authorization Header'
        })
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const secret = jwtKey;
    const options = {
        expiresIn: '1hr'
    }
    return jwt.sign(payload,secret, options)
}
