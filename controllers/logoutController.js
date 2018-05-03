const User = require('../models/userModel');
const session = ('express-session');
const express = ('express');

const logout = (req, res) => {
    req.session.regenerate(err => {
        res.json(err);
    })
    res.status(200).json({ msg: "Successfully Logged Out." });
}

module.exports = {
    logout
};