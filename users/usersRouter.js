const express = require('express');
const router = express.Router();
const User = require('./User');


// function authenticate(req, res, next) {
//     bcrypt.hash(req.body.password, 10)
//         .then(hashedpassword => {
//             if (hashedpassword === User.password) {
//                 next();
//             } else {
//                 res.status(401).send('Incorrect password or username. Please try again.')
//             }
//         })
// }

router
    .route('/register')
    .post((req, res) => {
        const user = new User(req.body);
        user.save()
            .then(user => {
                res.status(201).json({user})
            })
            .catch(err => {
                res.status(500).json({ error: 'Your registration could not be completed at this time. Please try again.'})
            })
    })

router
    .route('/login')
    .post((req, res) => {
        const { username, password } = req.body;
        User.findOne({username})
            .then(user => {
                if(user) {
                    // compare passwords
                    user.isPasswordValid(password)
                        .then(isValid => {
                            if(isValid) {
                                res.json({ success: 'Login Successful!'})
                            } else {
                                res.status(401).json({error: 'Invalid credentials!'})
                            }
                        })
                } else {
                    res.status(401).json({error: 'Invalid credentials!'}) // don't want to give away fact that username does not exist
                }
            })
            .catch(err => {
                res.status(500).json({error: 'Error logging in. Please try again.'})
            })
    })

router
    .route('/:id')
    .delete((req, res) => {
        const { id } = req.params;
        User.findByIdAndRemove(id)
            .then(removedUser => {
                if(!removedUser) {
                    res.status(404).json({ error: `User with id ${id} does not exist`})
                } else {
                    res.send({ success: 'Your account was deleted successfully.'})
                }  
            })
            .catch(err => {
                res.status(500).json({ error: 'Your user account could not be deleted at this time.'})
            })
    })

    module.exports = router;