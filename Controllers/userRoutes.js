const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
require('dotenv').config();

const secret = 'no size limit on tokens';
const User = require('../models/user');
const Note = require('../models/note');

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    username: user.username,
    iat: timestamp,
  };
  const options = { expiresIn: '4h' };
  return jwt.sign(payload, secret, options);
}

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username }, function(err, user) {
    if (err) {
      done(err);
    }
    if (!user) {
      done(null, false);
    }
    user.isPasswordValid(password, function(err, isValid) {
      if (err) {
        return done(err);
      }
      if (isValid) {
        const { _id, username } = user;
        return done(null, { _id, username });
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
  User.findById(payload.sub)
    .populate('notes')
    .select('-password')
    .then(user => {
      console.log('user', user);
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

module.exports = function(server) {
  server.get('/api/notes', protected, (req, res) => {
    Note.find({ author: req.user._id })
      .select('-author')
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json({ err: `Error getting notes from the server.` });
      });
  });

  server.post('/api/notes', protected, (req, res) => {
    console.log('body', req.body);
    const { title, content, author } = req.body;
    if (!title || !author || !content) {
      res.status(400).json({
        message: 'Please provide a title and content to save a note.',
      });
    }
    const note = new Note(req.body);
    note
      .save()
      .then(savedNote => {
        res.json(savedNote);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            'The server experienced an error creating the new note.',
        });
      });
  });

  server.delete('/api/notes/:id', protected, (req, res) => {
    Note.findByIdAndRemove(req.params.id)
      .then(response => {
        Note.find({})
          .then(notes => {
            res.status(204).json(notes);
          })
          .catch(err => {
            res
              .status(500)
              .json({ errorMessage: 'Error getting notes from the server.' });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'Error deleting note from the server.' });
      });
  });

  server.put('/api/notes/:id', protected, (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        res.status(204).json({ message: 'Note updated successfully' });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'Server error occured when attempting to update note.',
        });
      });
  });

  server.post('/api/register', (req, res) => {
    const credentials = req.body;

    const user = new User(credentials);
    user
      .save()
      .then(newUser => {
        const token = makeToken(newUser);
        res.status(200).json({ token });
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'A server error occurred while registering ' });
      });
  });

  server.post('/api/login', authenticate, (req, res) => {
    res.status(200).json({ token: makeToken(req.user), user: req.user });
  });
};
