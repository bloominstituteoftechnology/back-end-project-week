const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
// const server = express();

const User = require('./userModel');

const jwt = require('jsonwebtoken');
const secret = 'canolis are delish';

function restricted (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken; 
            if (err) {
                return res
                .status(401)
                .json({ message: 'Please sign in'});
            }
            next ();
        });
    } else {
        res.status(401).json({ message: 'Please create account by registering'})
    }
}

module.exports = getUser = router.get('/user', restricted, (req, res) => {
    
    User.find()
    .select('password')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = createUser = (req, res) => {
    const { userName, password} = req.body;
    User.create({ userName, password})
    .then(user => {
        const payload = {
            userName: user.userName
        };
        const token = jswt.sign(payload, secret);
        res.status(201).json({ user: user.userName, token});
    })
    .catch(err => res.status(500).json(err));

};

function restricted (user) {

}

