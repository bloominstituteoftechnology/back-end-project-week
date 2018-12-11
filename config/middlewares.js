require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    authenticate,
    generateToken,
};

function authenticate(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json(err);
            req.decoded = decoded;
            console.log(decoded.subject);
            next();
        });
    } else {
        return res.status(401).json({
            error: 'No token provided',
        });
    }
};

function generateToken(user) {
    const jwtPayload = {
        subject: user.id,
        hello: 'hello',
    };
    const jwtOptions = {
        expiresIn: '1h',
    };
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
};