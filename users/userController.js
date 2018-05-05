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
          const { _id, username } = user; 
          return done(null, { _id, username }); 
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
  User.findById(payload.sub).select('username').then(user => { 
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

router
  .route('/')
  .get((req, res) => {
    User.find({})
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .post((req, res) => {
    const user = new User(req.body);

    user
      .save()
      .then(savedUser => {
        // change the saved user
        res.status(201).json(savedUser);
      })
      .catch(err => res.status(500).json(err));
  });

  router
  .route('/api/register')
  .post((req, res) => {
    const credentials = req.body;

    //add new user to database
    const user = new User(credentials);
    user
    .save().then(insertedUser => {
        const token = makeToken(insertedUser);
        res.status(201).json({ token });
    });
});

router
.route('/api/login', authenticate )
.post((req, res) => {
  res.json({ token: makeToken(req.user), user: req.user });
});

router
.route('/api/notes', protected)
.get((req, res) => {
  User.find({ notes: 'notes' }).select('-password').then(notes => {
      res.json(notes)
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

  router
  .route('/:id')
  .get((req, res) => {
    User.findById(req.params.id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The user could not be removed', err });
        }
      });
  })
  .put((req, res) => {
    // const changes = { ...req.body, updatedOn:new Date() }

    User.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response === null) {
          res.status(404).json({ message: 'not found' });
        } else {
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            message: 'The id provided is invalid, please check and try again.',
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The user could not be removed', err });
        }
      });
  });

  module.exports = router;