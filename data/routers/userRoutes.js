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
            throw new ServerError(401, 'You shall not pass - No Token')
        }
    }
    catch (err) {
        res.status(err.code).json(err.message)
    }
}
router.get('/', async (req, res, next) => {
    const users = await db('users').select('username');
    res.status(200).send(users);
})

router.post('/register', (req, res, next) => {
    const user = req.body;

    try {
        if (!user.username || !user.password) { throw new ServerError(501, "Please fill out username and password") }
        else {
            user.password = bcrypt.hashSync(user.password, 10);

            db('users')
                .insert(user)
                .then(ids => {
                    db('users')
                        .where({ id: ids[0] })
                        .first()
                        .then(user => {
                            const token = generateToken(user);
                            res.status(201).json(token)
                        })
                })
        }
    }
    catch (err) {
        next(err);
    }
})

router.post('/login', (req, res, next) => {
    const credentials = req.body
    try {
        db('users')
            .where({ username: credentials.username })
            .first()
            .then(function (user) {
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    const token = generateToken(user);
                    res.send(token)
                }
                else { throw new ServerError(401, 'Incorrect Credentials') }
            })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;