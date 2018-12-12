require('dotenv').config();

const jwt = require('jsonwebtoken');


module.exports = {
    generateToken, protected
};

function generateToken(user) {
    const payload = {
        subject: id, 
        username: user.username
    };
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '3m'
    };
    return jwt.sign(payload, secret, options);
};

function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
};




