const jwt = require('jsonwebtoken');

const logoutDb = require('../data/helpers/logoutHelper.js');

// only proceed to next middleware if valid token (user is logged in)
module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const tokenLoggedOut = await logoutDb.tokenExists(token);
        if (!tokenLoggedOut) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ code: 13, message: 'Invalid token' });
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(200).json({ message: 'Please login' });
        }
    } else {
        res.status(401).json({ code: 14, message: 'No token was provided' });
    }
}