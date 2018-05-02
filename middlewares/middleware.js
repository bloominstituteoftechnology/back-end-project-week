const express = require('express');
const session = require('express-session');

const User = require('../models/userModel');

const authenticate = (req, res, next) => {
    if (req.session.authenticate) {
        res.status(200).json({ _id: req.session._id });
    } else {
        res.status(422).json({ errMsg: "Not Authorized" });
    }
}

module.exports = {
    authenticate
}