const express = require('express');
const router = express.Router();

const User = require('./User');

// will include after I deploy to heroku
// router.post('/api/notes', (req, res) => {
//     User.create(req.body)
//         .then(user => {
//             res.status(201).json(user);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Error saving to database', error: error });
//         })

// });








module.exports = router;