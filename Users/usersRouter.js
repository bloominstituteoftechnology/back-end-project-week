const express = require('express');
const User = require('./usersModel');
const router = express.Router();
const bcrypt = require('bcrypt');
// const Notes = require('../Notes/notesModel');


//POST USERS - Postman Test ok! http://localhost:8008/users (able to successfully post new users with PW hashing enabled)
router.route('/')
.post((req, res) => {
    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ errorMsg: 'Sorry User could not be created' }));
})

//GET USERS - Postman Test ok! http://localhost:8008/users (able to successfully get list of users with PW hashed)
.get((req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ errorMsg: 'The user could not be found' }))
});

//REGISTER USERS
// router.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     if (!(username && password)) {
//         res.status(422).json({ errorMsg: 'Please provide Username and Password' });
//     } else {
//         User.create({
//             username: username,
//             password: password
//         })
//         .then(saved => {
//             req.session.auth = true;
//             req.session._id = saved._id;
//             req.session.username = saved.username;
//             res.status(201).json(saved);
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     }
// });

// // //LOGIN USERS
// router.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     User.authenticate(username, password, function(error, user) {
//         if (error || !user) {
//             res.status(401).json({ errorMsg: 'Invalid Credentials' });
//         } else {
//             console.log('Login Successful');
//             req.session.auth = true;
//             req.session._id = user._id;
//             req.session.username = user.username;
//             res.status(200).json({ success: true, user: user });
//             console.log(req.session.userId);
//         }
//     });
// });

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