const server = require('express').Router();
const cors = require('cors');
const User = require('../models/User');

server.use(cors());

server.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'There was a problem getting the users' });
        });
});

// server.get('/:id', (req, res) => {
//     const { id } = req.params;

//     User.findById(id)
//         .then(user => {
//             if (user !== null) {
//                 res.status(200).json(user);
//             } else {
//                 res.status(404).json({ message: "That not user could not be found." })
//             }
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ message: 'There was a problem getting that user' });
//         });
// });

server.post('/signup', (req, res) => {
    User.create(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'Error saving that user to the DB' });
        });
});


// server.delete('/delete/:id', (req, res) => {
//     const { id } = req.params;

//     if (!id) {
//         res.status(422).json({ message: 'You need to give me an ID' });
//     } else {
//         User.findByIdAndRemove(id)
//             .then(user => {
//                 if (user) {
//                     res.status(204).end();
//                 } else {
//                     res.status(404).json({ message: 'User not found' });
//                 }
//             })
//             .catch(err => res.status(500).json(err));
//     }
// });

module.exports = server;