// const jwt = require('jsonwebtoken');

// const bcrypt = require('bcryptjs');


// // function authenticate(req, res, next) {
// //     const token = req.get('Authorization');
// //     if(token) {
// //         jwt.verify(token, )
// //     }
// // }

// //add new migration for users

// function register(req, res) {
//     const creds = req.body;
//     const hash = bcrypt.hashSync(creds.password, 10);
//     creds.password = hash;
//     db('users')
//         .insert(creds)
//         .then(ids => res.status(201).json(ids))
//         .catch(err => res.status(400).json({ message: 'Registration failed' }))
// };

// fucntion login(req, res) {
//     const creds = req.body;
//     db('users')
//         .where({ username: creds.username })
//         .first()
//         .then(user => {
//             if(user && bcrypt.compareSync(creds.password, user.password)) {
//                 const token = generateToken(user);
//                 res.status(200).json({ message: 'Welcome', token });
//             } else {
//                 res.status(401).json({ message: 'username or password information is incorrect'});
//             }
//         })
// };

