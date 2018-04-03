const User = require('./user');
const bcrypt = require('bctypt');

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const sendUserError = (err, res) => {
    res.status(STATUS_USER_ERROR);
    if (err && err.message) {
        res.json({ message: err.message, stack: err.stack });
    } else {
        res.json({ error: err });
    }
};

/* ************ MiddleWares ***************** */

const hashedPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        sendUserError('Password is required', res);
        return;
    }
    bcrypt
        .hash(password, BCRYPT_COST)
        .then(pw => {
            req.password = pw;
            next();
        })
        .catch(err => {
            throw new Error(err);
        });
};