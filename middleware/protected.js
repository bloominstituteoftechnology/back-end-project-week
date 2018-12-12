const jwt = require('jsonwebtoken');

// only proceed to next middleware if valid token (user is logged in)
module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ code: 13, message: 'Invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ code: 14, message: 'No token was provided' });
    }
}