const express = require('express');
const router = require('express').Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./UserModel');
const secret = 'There is no urf mode';

const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const logout = require('express-passport-logout');

const localStrategy = new LocalStrategy(function(username, password, done) {
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
        const { username, password } = req.body;
        
        User.findOne({ username }, (err, user) => {
            if (err) {
              res.status(403).json({ error: 'Invalid Username/Password' });
              return;
            }
            if (user === null) {
              res.status(422).json({ error: 'No user with that username in our DB' });
              return;
            }
            user.verifyPassword(password, (nonMatch, hashMatch) => {
              // This is an example of using our User.method from our model.
              if (nonMatch !== null) {
                res.status(422).json({ error: 'passwords dont match' });
                return;
              }
           
              if (hashMatch) {
                // if (req.headers['authorization'] ===  ){
                //     res.status(422).json({ error: 'You are already logged in' });
                // }else {
                res.json({ token: makeToken(req.user), user: req.user });
                
              }
            });
          });

  });

router
    .get('/logout', (req, res)=> {
        res.status(200).send({ auth: false, token: null });
        console.log(req.headers['authorization']);
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