const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const getTokenForUser = (userObject, time) => {
    // creating a JWT and returning it.
    // this function is more of a simple helper function than middleware,
    // notice `req, res and next` are missing, this is because the auth is simple here.
    // no need for custom middleware, just a helper function. :)
    // time Ex. 1m, 1h
    return jwt.sign(userObject, secret, { expiresIn: time });
};

const validateToken =  (req, res, next) => {
    const token = req.cookies.access_token;

    console.log('access_token:::', req.cookies.access_token);

    if (!token) {
        res.status(499);
        res.json({message: 'Required Token.'});
        return
    }

    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res.status(403);
            res.json({ error: 'Token invalid, please login', message: authError });
            return;
        }

        console.log('token decoded:::', decoded);
        // sets the decoded JWT/user object on the request object for use in next middleware.
        req.decoded = decoded;
        next();
    });

};

const extendTokenLife = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(499);
        res.json({message: 'Required Token.'});
        return
    }

    jwt.verify(token, secret, (authError, decoded) => {
        if (authError) {
            res.status(403);
            res.json({ error: 'Token invalid, please login', message: authError });
            return;
        }

        req.decoded = decoded;

        const token = getTokenForUser({ user: decoded.user,
            access: true }, '10m');

        res.cookie('access_token', token, { maxAge: 604800, httpOnly:true });
        res.send({"data":decoded});
        // sets the decoded JWT/user object on the request object for use in next middleware.
        return next();
    });
};

const resolve = (req, res, next) => {
    res.status(200).send({});
    return next();
};

module.exports = {
    getTokenForUser,
    validateToken,
    resolve,
    extendTokenLife
};
