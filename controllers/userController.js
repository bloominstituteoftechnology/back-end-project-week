const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userRegistration = (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = new User(req.body);

    user
        .save()
        .then(newUser => {
            res.status(201).json(newUsers);
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Could not create user account." });
        })
}

const getUsers = (req, res) => {

    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ errMsg: 'Could not retrieve users' });
        })

}

const retrieveUserNotes = (req, res) => {

    User
        .findById(req.params.id)
        .then(noteList => {
            let noteId = note.id;

            Note
                findById(req.params.id)
                .then(noteList => {
                    res.status(200).json(noteList);
                })
                .catch(err => {
                    res.status(500).json({ errMsg: 'Could not retrieve notes.' });
                })
        })
        .catch(err => {
            res.status(404).json(err);
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
    getUsers,
    retrieveUserNotes,
    updateUser,
    deleteUser,
};