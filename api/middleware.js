// require('dotenv').config();

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');



// function generateToken(user) {
//     const payload = {
//         subject: id, 
//         username: user.username
//     };
//     const secret = process.env.JWT_SECRET;
//     const options = {
//         expiresIn: '3m'
//     };
//     return jwt.sign(payload, secret, options);
// };

// function protected(req, res, next) {
//     const token = req.headers.authorization;
//     if(token) {
//         jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
//             if(err) {
//                 res.status(401).json({ message: 'invalid token' });
//             } else {
//                 req.decodedToken = decodedToken;
//                 next();
//             }
//         });
//     } else {
//         res.status(401).json({ message: 'no token provided' });
//     }
// };

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

// function login(req, res) {
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
//         .catch(err => res.status(400).json({ message: 'username or password information is incorrect'}))
// };

