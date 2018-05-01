const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userRegistration = (req, res) => {
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

const updateUser = (req, res) => {

    User 
        .findByIdAndUpdate(req.params.id, (err, updatedUser) => {
            if (err || User === null) {
                res.status(500).json({ errMsg: 'Error retreiving selected note' })
            } else {
                res.status(200).json(updatedNote);     
            }
        })
}

const deleteUser = (req, res) => {
    
    User
        findByIdAndRemove(req.params.id, (err, deletedUser) => {
            if (err) {
                res.status(500).json(err);
            }
                res.status(200).redirect('/');
        })
}

module.exports = {
    userRegistration,
    updateUser,
    deleteUser,
}