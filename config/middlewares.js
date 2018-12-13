const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    authenticate,
    generateToken,
    generateTokenReg
};

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) return res.status(401).json(err);
            req.decoded = decoded;
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

function generateTokenReg(user) {
    const jwtPayload = {
        subject: user[1],
        hello: 'hello',
    };
    const jwtOptions = {
        expiresIn: '1h',
    };
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
};