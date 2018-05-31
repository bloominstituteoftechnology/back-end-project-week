const express = require('express');
const User = require('./usersModel');
const router = express.Router();
// const Notes = require('../Notes/notesModel');
const bcrypt = require('bcrypt');

//POST USERS
router.route('/')
.post((req, res) => {
    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry User could not be created' }));
})

//GET USERS
.get((req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ errorMsg: 'The user could not be found' }))
})

module.exports = router;

















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