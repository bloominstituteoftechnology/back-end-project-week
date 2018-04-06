const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 11;
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const getTokenForUser = userObject => {
    return jwt.sign(userObject, secret, {expiresIn: '1h'})
};

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403)
                .json({
                    error: 'Token inValid'
                });
                return;
        };
        req.decoded = decoded;
        next();
    });
};

const logIn = (req, res) => {
    const {User, passWord} = req.body;
    User.findOne({User}, (err, user) => {
        if (err) {
            res.status(500)
                .json({
                    error: ' Invalid User or password'
                });
                return;
        }
        if (user === null) {
            res.status(422)
                .json({
                    err: 'User does not exist'
                });
                return;
        }
        User.checkPassword(Password, (noMatch, match) => {
            if (noMatch !== null) {
                res.status(422)
                    .json({
                        error: 'Password does not match'
                    });
                    return;
            }
            if (match) {
                const payload = {
                    User: User.username,
                    id: User.id,
                };
                const token = jwt.sign(payload, secret);
                    res.json({
                        message: 'Logged in successfully'
                    });
            }
        });
    });
};


module.exports = {
    getTokenForUser,
    validateToken,
    logIn,
}