const express = require('express');
const User = require('./User.js');
const router = express.Router();

router
    .route('/')
    .post((req, res) => {
        const {username, password} = req.body;
        if (!username || !password){
            res.status(400).json({errMessage: 'Please provide both username and password'})
            return;
        }
        const newUser = new User({username, password});
        newUser.save()
            .then(result => res.json(result))
            .catch(err => res.status(500).json({error: err.message}));
    });
router
    .post('/login', (req, res) => {
        const {username, password} = req.body;
        User.findOne({username})
            .then(user => {
                if (user) {
                    user
                        .confirmPW(password)
                        .then(pwMatch => {
                            if(pwMatch == true){
                                res.status(200).json(user);
                            }else{
                                res.status(401).send('invalid creds, please try again.');
                            }
                        })
                        .catch(err => {
                            res.send('error comparing passwords');
                        });
                } else {
                    res.status(401).send('invalid creds, please try again.');
                }
            })
            .catch(err => {
                res.send(err);
            });
    });
    module.exports = router;