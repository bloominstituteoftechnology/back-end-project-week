const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registration = (req, res) => {
    const {firstName, lastName, userName, password } = req.body;
    const user = new User({ firstName, lastName, userName, password });

    user
        .create()
        .then(res => {
            res.status(201).redirect('/:id');
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Could not create user account." });
        })
}

