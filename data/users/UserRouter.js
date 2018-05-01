const express = require('express');

const User = require('./UserModel');

const router = express.Router();

router
    .get('/', (req, res) => {
        User
        .find()
        .then(users => {
            res.status(200).json(users)
        }).catch(err => res.status(500).json(err));
    })
    .post('/register', (req, res) => {
        console.log('trying...');
        if (req.body.firstName &&
            req.body.lastName &&
            req.body.username &&
            req.body.password) {
            const user = new User(req.body);
            console.log('okay...')
            User
                .save()
                .then(savedUser => res.status(200).json(savedUser))
                .catch(err => res.status(500).json(err));
        } else {
            res.status(422).json({ message: 'Please provide a first name, last name, username, and password when creating a new user.'})
        }
    })
    .post('/login', (req, res) => {
        const { username, password } = req.body;
        if (!username || ! password) {
            res.json(422).json({ message: "Please provide both a username and password in order to login." })
            return;
        } User
            .findOne({ username })
            .then(user => {
                console.log(user);
                User
                    .authenticate(password, user.password)
                    .then(isValid => {
                        if(isValid) {
                        res.status(200).json({ success: "true" })         
                        } else {
                          res.status(500).json({message: "sorry!"});
                        }
                    }).catch(err => res.status(500).json('yep'));
                res.status(200).json(user);
            }).catch(err => res.status(500).json('yup'));
    })


module.exports = router;