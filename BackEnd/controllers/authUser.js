const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 11;
const secret = require('../config');

const comparePassword = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) console.error(err);
                    if (isValid) {
                        req.username = user.username;
                        next();
                    }
                })
            } else {
                res.status(404).json({ err: 'Incorrect username/password' });
            }
        })
        .catch(err => {
            res.status(500).json(`Error accessing DB.`)
        })
};

const encryptPassword = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json({ error: 'Must provide email and password' });
    } else {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) console.error(err);
            if (hash) {
                user = {
                    username,
                    password: hash
                }
                req.user = user;
                next();
            };
        });
    };
};

const authenticate = (req, res, next) => {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, secret, (err, decrypted) => {
            if (err) res.status(422).json(err);
            req.decrypted = decrypted;
            req.username = decrypted.username;
            next();
        })
    } else {
        res.status(403).json({
            error: 'Must provide token in the header'
        })
    }
};

const login = (req, res) => {
    if (req.username) {
        const token = jwt.sign({ username: req.username }, secret)
        res.json({ token });
    } else {
        res.status(404).json({ error: 'Must properly login to view page' })
    }
};

const signup = (req, res) => {
    const user = new User(req.user);

    user.save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
};

module.exports = {
    comparePassword,
    encryptPassword,
    authenticate,
    login,
    signup
}; 