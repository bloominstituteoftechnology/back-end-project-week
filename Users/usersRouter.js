const express = require('express');
const Users = require('./usersModel');
// const Notes = require('./notesModel');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
    const { username, password } = req.body;

    User
        .create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry cannot save user' }))
    };

module.exports = { createUser };

















// // //GET USERS
// // const GET = (req, res) => {
// //     User
// //         .find()
// //         .populate('notes')
// //         .then(users => {
// //           users.length === 0 ?
// //             res.status(204).json({ msg: 'Sorry Could Not Retrieve Users from DB' }) :
// //             res.status(200).json(users) //ok
// //         })
// //         .catch(err => res.status(500).json({ ErrorMsg: 'Sorry - Server Error has Occured' }))
// // }

// // //POST USERS
// // const POST = (req, res) => {
// //     User
// //         .create(req.body)
// //         .then(user => res.status(201).json(user))
// //         .catch(err => res.status(500).json({ ErrorMsg: 'Sorry - You Cannot Create a New User' }))
// // }

// // //PUT USERS

// // //DELETE USERS

// // router.route('/')
// //     .get(GET)
// //     .post(POST)


// // module.exports = router;