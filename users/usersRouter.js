const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt')

const secret = 'this is my secret'

require('dotenv').config();

const User = require('./User');

// function makeToken(user) {
//     const timestamp = new Date().getTime();
//     const payload = {
//         sub: user._id, // subject
//         iat: timestamp, // issued at
//     };
//     const options = {
//         expiresIn: '24h'
//     };
//     return jwt.sign(payload, process.env.secret, options);
// }

// helper function
const localStrategy = new LocalStrategy(function(username, password, done) {
    User.findOne({username}).then(user => {
        if(!user) {
            done(null, false);
        } else {
            user
            .validatePassword(password)
            .then(isValid => {
                const { _id, username } = user;
                return done(null, { _id, username });
            })
            .catch(err => {
                return done(err);
            })
        }
    }).catch(err => done(err))
})


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: secret
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub)
    .then(user => {
        if(user) {
            done(null, user)
        } else {
            return done(null, false)
        }
    })
    .catch(err => {
        return done(err);
    })
});

// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);

// passport local middleware
const passportOptions = { session: false };
const authenticate = passport.authenticate('local', passportOptions);
const protected = passport.authenticate('jwt', passportOptions);

router
    .route('/')
    // .get(protected, (req, res) => {
        .get((req, res) => {
        User.find()
        .select('username')
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching users'})
        })
    })
    
router
    .route('/register')
    .post((req, res) => {
        const { email, username, password } = req.body;

        if(!req.body.password || req.body.password.length < 10) {
            return res.status(400).json({error: 'Please provide a password that is at least 10 characters in length'}) 
        }

        if(!req.body.email) {
            return res.status(400).json({ error: 'Please provide an email for your account'})
        }

        if(!req.body.username) {
            return res.status(400).json({ error: 'Please provide a username for your account'})
        }

        const user = new User({ email, username, password });

        user.save()
            .select('-password')
            .then(user => {
                const token = makeToken(user);
                res.status(201).json({ user, token })
            })
            .catch(err => {
                res.status(500).json({ error: 'Your registration could not be completed at this time. Please try again.' })
            })
    });

    function makeToken(user) {
        const timestamp = new Date().getTime();
        const payload = {
            sub: user._id, // subject
            iat: timestamp, // issued at
        };
        const options = {
            expiresIn: '24h'
        };
        return jwt.sign(payload, secret, options);
    }


// router 
//     .route('/login')
//     .post(authenticate, (req, res) => {
//         const { username, password } = req.body;
//         User.findOne({ username })
//             .then(user => {
//                 if (user) {
//                     // compare passwords
//                     user.isPasswordValid(password)
//                         .then(isValid => {
//                             if (isValid) {
//                                 res.json({ success: 'Login Successful!' })
//                             } else {
//                                 res.status(401).json({ error: 'Invalid credentials!' })
//                             }
//                         })
//                 } else {
//                     res.status(401).json({ error: 'Invalid credentials!' }) // don't want to give away fact that username does not exist
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({ error: 'Error logging in. Please try again.' })
//             })
//     })

router
    .route('/login')
    .post(authenticate, (req, res) => {
        // if we're here the user logged in correctly
        res.json({ token: makeToken(req.user), user: req.user })
    })

router
    .route('/:id')
    .delete((req, res) => {
        const { id } = req.params;
        User.findByIdAndRemove(id)
            .then(removedUser => {
                if (!removedUser) {
                    res.status(404).json({ error: `User with id ${id} does not exist` })
                } else {
                    res.send({ success: 'Your account was deleted successfully.' })
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Your user account could not be deleted at this time.' })
            })
    })



module.exports = router;