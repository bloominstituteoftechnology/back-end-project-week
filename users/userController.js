const express = require('express');
const router = require('express').Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./UserModel');
const secret = 'There is no urf mode';

const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const localStrategy = new LocalStrategy(function(username, password, email, done) {
    User.findOne({ username }, function(err, user) {
        if (err) {
            done(err);
        }
        if (!user) {
            done(null, false);
        }
        user.verifyPassword(password, function(err, isValid) {
            if (err) {
                return done(err);
            }
            if (isValid) {
                const { _id, username, email } = user;
                return done(null, { _id, username, email });
            }
            return done(null, false);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User
        .findById(payload.sub)
        .select('-password')
        .then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
});

passport.use(localStrategy);
passport.use(jwtStrategy);
const authenticate = passport.authenticate('local', { session: false });
const protected = passport.authenticate('jwt', { session: false });


router
    
    .get('/', function(req, res) {
    res.send({ api: 'up and running'})
});

router
    .post('/register', function(req, res) {
        const credentials = req.body;
        const user = new User(credentials);
        user.save()
        .then(inserted => {
            const token = makeToken(inserted);
            res.status(201).json({ token });
        })
        .catch(err => res.status(500).json({ Error: 'error registering'}));
    });

router
    .post('/login', authenticate, (req, res) => {
    res.json({ token: makeToken(req.user), user: req.user });
  });

function makeToken(user) {
    const timestamp = new Date().getTime();
    const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username,
        email: user.email,
    };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
}

module.exports = router;