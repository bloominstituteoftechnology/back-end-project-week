const express = require('express');
const User = require('./UserModel');
const validate = require('../../assets/middlewares/validate');

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
        if (req.body.firstName &&
            req.body.lastName &&
            req.body.username &&
            req.body.password) {
            const user = new User(req.body);
            user
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
                return user
                    .authenticate(password)
                    .then(authenticated => {
                        if(authenticated) {
                            req.session.username = user.username;
                            res.status(200).json(req.session.username);
                        } else {
                            res.status(400).json({ message: "Incorrect username/password combination." });
                        }
                    }).catch(err => console.log(err));
            }).catch(err => res.status(500).json(err));
    })
    .post('/logout', (req, res) => {
        if(!req.session) {
            res.status(400).json({message: "You are note currently logged in."})
        }
        req.session.destroy();
        res.status(200).json({message: "Successfully logged out."})
    })
    .get('/me', validate, (req, res) => {
        if (!req.user) {
            res.status(400).json({ message: 'You are not logged in.'})
        } else {
            res.json(req.user.username);
        }
    });


module.exports = router;