const router = require('express').Router();
// const jwt = require('jsonwebtoken');

// const secret = 'Derrick is really Kevin';

// const User = require('../users/User');
const Note = require('../notes/Note');

// function restricted(req, res, next) {
//     const token = req.headers.authorization;
//     if (token) {
//         jwt.verify(token, secret, (err, decodedToken) => {
//             if (err) {
//                 res.status(401).end('Your token is incorrect');
//             } else {
//                 req.jwtPayload = decodedToken;
//                 next();
//             }
//         });
//     } else {
//         res.status(401).end('You have no token, please login to get token');
//     }
// }

//router.use(restricted);

router
    .route('/')
    .get((req, res) => {
        Note.find()
            .then(notes => {
                return res.status(200).json(notes);
            })
            .catch(err => res.status(500).json(err));
    })
    .post((req, res) => {
        Note.create(req.body)
            .then(note => {
                res.status(200).json(note);
            })
            .catch(err => res.status(500).json(err, 'error creating note'));
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Note.findById(id)
            .then(note => res.status(200).json(note))
            .catch(() => res.status(500).json('error retrieving note'));
    })
    .put((req, res) => {
        const { id } = req.params;
        const options = { new: true };
        Note.findByIdAndUpdate(id, req.body, options)
            .then(note => res.status(201).json(note))
            .catch(() => res.status(500).json('error updating note'));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove(id)
            .then(deletedNote => res.status(200).json(deletedNote))
            .catch(() => res.status(500).json('error deleting note'));
    });

module.exports = router;
