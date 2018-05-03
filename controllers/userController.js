const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userRegistration = (req, res) => {
    const { name, userName, email, password } = req.body;
    const user = new User(req.body);

    user
        .save()
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Could not create user account." });
        })
}

// const getUsers = (req, res) => {

//     User
//         .find()
//         .populate('notes')
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(err => {
//             res.status(500).json({ errMsg: 'Could not retrieve users' });
//         })

// }

const updateUser = (req, res) => {
    const { id } = req.params;
    const update = (req.body);

    User 
        .findByIdAndUpdate(id, update, {new:true})
        .then(updatedUsers => {
            res.status(200).json(updatedUsers)
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

const deleteUser = (req, res) => {
    
    User
        .findByIdAndRemove(req.params.id, (err, deletedUser) => {
            if (err) {
                res.status(500).json(err);
            }
                res.status(200).json({ msg: "User deleted." });
        })
}

module.exports = {
    userRegistration,
    // getUsers,
    updateUser,
    deleteUser,
};