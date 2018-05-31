const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../users/User');

const localStrategy = new LocalStrategy(function(username, password, done) {
    User.findOne({ username }).then(user => {
        user => {
            if(!user) {
                done(null, false);
            } else {
                user.validatePassword(password).then(isValid => {
                    if (isValid) {
                        const { _id, username } = user; 
                        return done(null, {_id, username })
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => {
                    return done(err);
                })
            }
        }
    })
    .catch(err => done(err))
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User
    .findById(payload.sub)
    .then(user => {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
    .catch(err => {
        done(err)
    })
})

// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);

// passport local middleware
const passportOptions = { session: false };
const authenticate = passport.authenticate('local', passportOptions);
const protected = passport.authenticate('jwt', passportOptions);

// helper

function makeToken(user) {
    const timestamp = new Date().getTime();
    const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username,
    };
    const options = {
        expiresIn: '24h',
    }
    return jwt.sign(payload, secret, options);
}

module.exports = {
    localStrategy,
    jwtStrategy,
  }