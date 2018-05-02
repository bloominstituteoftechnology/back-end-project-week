const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./userModel.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const secret = 'no size limit on tokens';

function makeToken(user) {
    // return token
    // sub: subject (id) of the token
    // timestamp
    const timestamp = new Date().getTime();
    const payload = {
        sub: user._id,
        iat: timestamp,
        username: user.username,
        race: user.race,        
    };
    
    const options = { expiresIn: '4h'};
    return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) { //middleware
    User.findOne({ username }, function(err, user) {
        if (err) { done(err) }
        if (!user) {
            done(null, false);
        }
        user.verifyPassword(password, function(err, isValid) {
            if(err) {
                return done(err);
            }
            if(isValid) {
            const { _id, username, race } = user; //if the pswd is valid and user exists
            return done(null, { _id, username, race }); // placed on req.user
            }
            return done(null, false);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub).select('username race').then(user => {
        if(user) {
        done(null, user);
        } else {
        done(null, false);
        }
    })
    .catch(err => {
        //handle error
        return done(err, false);
    });
});

//use strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

//generate the passport middleware
const authenticate = passport.authenticate('local', { session: false });
const protected = passport.authenticate('jwt', { session: false });

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.send({ api: 'up and running' });
      });

    app.post('/api/register', function(req, res) {
          const credentials = req.body;

          //add user to database
          const user = new User(credentials);
          user
          .save().then(insertedUser => {
              const token = makeToken(insertedUser);
              res.status(201).json({ token });
          });
      });

    app.post('/api/login', authenticate, (req, res) => {
        //find user using the creds from body
        //verify pswd with what we have stored
        //issue token to user = if successful login
        //grants access to the resource(s)
        res.json({ token: makeToken(req.user), user: req.user });

    });
    app.get('/api/hobbits', protected, (req, res) => {
        User.find({ race: 'hobbit' }).select('-password').then(hobbits => {
            res.json(hobbits)
        })
        .catch(err => {
            res.status(500).json(err);
        });
    });
};

  module.exports = router;