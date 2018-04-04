const express = require('express');
const User = require('../models/userSchema.js');
const { authenticate } = require('../utils/middlewares');

const fetch = require('node-fetch');

const jwt = require('jsonwebtoken');
const { key } = require('../../config');

const userRouter = express.Router();
const bcrypt = require('bcrypt');

const newUser = (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save((err, user) => {
        if (err) return res.send(err);
        res.json({
            success: `User saved`,
            user
        });
    });
};

const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.send(err);
        res.send(users);
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id)

        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while getting the user." });
        });
};


const updateUserById = (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;

    User.findByIdAndUpdate(id, userInfo)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while updating the user.` });
      });
}

const deleteUserById = (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;

    User.findByIdAndRemove(id, userInfo)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'User is not in our database.' });
        });
};

const getAllJokes = (req, res) => {
    if (req.decoded) {
        fetch(
            //Test
            'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
        )
            .then(posts => posts.json())
            .then(jokes => res.json(jokes))
            .catch(err => res.status(500).json({ error: 'Error Fetching Jokes' }));
    } else {
        return res.status(422).json({ error: `Can't get these jokes!` });
    }
};

const newLogin = (req, res) => {
    const { username, password } = req.body;
    const lowerCaseUsername = username.toLowerCase();
    User.findOne({ username: lowerCaseUsername }, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid Username/Password' });
            return;
        }
        if (user === null) {
            res.status(422).json({ error: 'No user with that username in our database.' });
            return;
        }
        user.checkPassword(password, (nonMatch, hashMatch) => {
            if (nonMatch !== null) {
                res.status(422).json({ error: 'passwords don\'t match' });
                return;
            }
            if (hashMatch) {
                const payload = {
                    username: user.username
                };
                const token = jwt.sign(payload, key);
                res.json({ token });
            }
        });
    });
};

module.exports = { userRouter, newUser, newLogin, getUsers, getAllJokes, deleteUserById, getUserById, updateUserById }