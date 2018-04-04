const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const getTokenForUser = userObject => {
    // creating a JWT and returning it.
    // this function is more of a simple helper function than middleware,
    // notice `req, res and next` are missing, this is because the auth is simple here.
    // no need for custom middleware, just a helper function. :)
    return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
    // this piece of middleware is taking the token delivered up to the server and verifying it
    // if no token is found in the header, you'll get a 422
    // if token is not valid, you'll be asked to login
    const token = req.headers.authorization;
    if (!token) {
        res
            .status(422)
            .json({ error: 'No authorization token found on Authorization header' });
    }
    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res
                .status(403)
                .json({ error: 'Token invalid, please login', message: authError });
            return;
        }
        // sets the decoded JWT/user object on the request object for use in next middleware.
        req.decoded = decoded;
        next();
    });
};

module.exports = {
    getTokenForUser,
    validateToken
};