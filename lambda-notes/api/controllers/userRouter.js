const express = require('express');

const userModel = require('../models/userSchema.js');

const userRouter = express.Router();

const newUser = (req, res) => {
    const userInfo = req.body;
    const user = new userModel(userInfo);

    if (!user || !user.password ) {
        res.status(400).json(`Your username or password is not defined.`)
    }

    if (!user.firstName || !user.lastName) {
        res.status(400).json(`We need your chosen first last name .`)
    }
    
    user
    .save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while creating a user.` });
    })
}

const newLogin = (req, res) => {
    const userInfo = req.body;
    const user = user.find()
    user
    .save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while logging in.` });
    })
}

module.exports = { userRouter, newUser, newLogin };