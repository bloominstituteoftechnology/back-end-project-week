const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../knexConfig');

const router = express.Router();

const secret = "welcome to atlanta"

class ServerError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

function generateToken(user) {
    const payload = {
        username: user.username
    }

    const options = {
        expiresIn: '48h',
        jwtid: '789456123'
    }
    return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    try {
        if (token) {
            jwt.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    throw new ServerError(401, 'You shall not pass - Invalid Token')
                }
                req.jwtToken = decodedToken;
                next();
            });
        }
        else {
            throw new ServerError(401, ' You shall not pass - No Token')
        }
    }
    catch (err) {
        res.status(err.code).json(err.message)
    }
}

router.post('/register', (req, res, next) => {

})

router.post('/login', (req, res, next) => {

})

module.exports = router;