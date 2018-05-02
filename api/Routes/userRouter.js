const express = require("express");
const router = express.Router();

const User = require("../api/models/userModel.js");

router.get('/api/notes/users', (req, res) => {
    User
    .find({})
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ err: 'Could not display users...' })
    })
})

router.post('/api/notes/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser
    .save()
    .then(newuser => {
        res.status(200).json(newuser)
    })
    .catch(err => {
        res.status(422).json({ err: 'Could not create user...' });
    })

})

module.exports = router;