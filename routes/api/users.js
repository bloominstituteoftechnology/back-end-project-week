const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const keys = require('../../config/keys');
const User = require('../../models/User');


const router = express();

// @route  Get api/users/register
// @desc   Register new user
// @access Public
router.post('/register', (req, res) => {

    User.findOne({email: req.body.email})
        .then(user => {

            if (user) {
                return res.status(400).json({email: 'Email already exists'});
            }
            else {
                const avatar = gravatar.url(req.body.email,
                    {
                        s: '200',
                        r: 'PG',
                        d: 'mm'
                    });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(14, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {

                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => console.log(err));
});

// @route  Get api/users/register
// @desc   Register new user
// @access Public
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({email})
        .then(user => {

            if (!user) {
                return res.status(404).json({error: 'Account not found'});
            }


            bcrypt.compare(password, user.password)
                .then(isMatch =>  {

                    if (isMatch) {

                        const payload = {id: user.id, name: user.name, avatar: user.avatar};


                        jwt.sign(payload, keys.secret,
                            {expiresIn: 3600},
                            (err, token) => {

                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });

                            });

                    }
                    else {
                        return res.status(400).json({error: 'Password is incorrect'});
                    }
                });
        })
});
module.exports = router;