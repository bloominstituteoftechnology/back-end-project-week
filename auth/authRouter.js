const router = require('express').Router();

const User = require('../users/User');
// const Note = require('../notes/Note');

router.post('/register', function(req, res) {
    User.create(req.body)
        .then(({ username }) => {
            res.status(201).json({ username });
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

// router.post('/createnote', function(req, res) {
//     Note.create(req.body)
//         .then(({ title, content }) => {
//             res.status(201).json({ title, content });
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         });
// });

module.exports = router;