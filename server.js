require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Sentiment = require('sentiment');
const language = require('@google-cloud/language');

const Note = require('./models/note');

server.use(express.json());
server.use(cors());
server.use(helmet());

const sentiment = new Sentiment();
const client = new language.LanguageServiceClient();

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`\n server listening on port ${port}`));

  mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}`)
    .then(mongo => console.log('connected to database'))
    .catch(err => console.log(err));
}

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);
const errorLog = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err.message);
}

/*** AUTH SETUP *****************/
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('./models/user');
const secret = 'yo dude';

// for login
const localStrategy = new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.verifyPassword(password)) return done(null, false);

      return done(null, user); // user gets pass on to request
    });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// for protect api routes
const jwtStrategy = new JwtStrategy(jwtOptions, function(jwtPayload, done) {
  // here the token was decoded successfully
  User.findOne({id: jwtPayload.sub},'-_password -__v', function(err, user) {
    if (err) return done(err);
    if (user) return done(null, user);
    if (!user) return done(null, false); 
  });
});
//
// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);

// passport local middleware
const passportOptions = { session: false };
const authenticate = passport.authenticate('local', passportOptions); // authenticate using local strategy (for user login)
const protected = passport.authenticate('jwt', passportOptions); // authenticate using jwt strategy (for api authentication)


function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username,
  };
  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, secret, options);
}

/*** ROUTES *****************/


server.post('/register', asyncHandler(async (req, res) => {
    // const response = await Category.find({}, '-_id -__v')
  let user = await User.create(req.body);
  const token = makeToken(user);

  user = { _id: user._id, username: user.username };
  res.status(201).json({ user, token })
}));

server.post('/login', authenticate, (req, res) => {
  // if we're here the user logged in correctly
  const user = { _id: req.user._id, username: req.user.username };
  res.status(200).json({ token: makeToken(req.user), user: user });
});

server.get('/logout', asyncHandler((req, res) => {
  req.logout();
  res.redirect('/');
}));

server.post('/api/notes',  asyncHandler(async (req, res) => {
  const response = await Note.create(req.body)
  res.status(201).json(response);
}));

server.get('/api/notes',  asyncHandler(async (req, res) => {
  const response = await Note.find()
  res.status(200).json(response);
}));

server.get('/api/notes/:id',  asyncHandler(async (req, res) => {
  const response = await Note.findById(req.params.id)
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

server.put('/api/notes/:id',  asyncHandler(async (req, res) => {
  // const sentScore = sentiment.analyze(req.body.content);
  // req.body.sentiment = sentScore.score;
  // req.body.comparative = sentScore.comparative;
  // req.body.title = `Score: ${sentScore.score}, Comparative: ${sentScore.comparative}`; 

  const document = {
    content: req.body.content,
    type: 'PLAIN_TEXT'
  };

  let score = await client.analyzeSentiment({ document });
  score = score[0].documentSentiment.score;
  console.log("raw score is ", score);
  score = Number(score).toFixed(2);
  req.body.sentiment = score;
  req.body.color = getSentimentColor(score);
  req.body.sentimentTitle = `Sentiment Score: ${score}`; 

  const response = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true})
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

server.delete('/api/notes/:id',  asyncHandler(async (req, res) => {
  const response = await Note.findByIdAndRemove(req.params.id)
    || `Note with id ${req.params.id} not found`;
  res.status(200).json({ message: `Note with id ${response._id} deleted.`});
}));

// needs to be last: https://expressjs.com/en/guide/error-handling.html
server.use(errorLog);

function getSentimentColor(score) {
  if (between(score,  -1, -.8)) return "#0066CC";
  if (between(score, -.8, -.6)) return "#00FFCC";
  if (between(score, -.6, -.4)) return "#3399CC";
  if (between(score, -.4, -.2)) return "#33FFCC";
  if (between(score, -.2,   0)) return "#6699CC";
  if (between(score,   0,  .2)) return "#66CCCC";

  if (between(score,  .2,  .4)) return "#66CCCC";
  if (between(score,  .4,  .6)) return "#9999CC";
  if (between(score,  .6,  .8)) return "#FF6699";
  if (between(score,  .8,   1)) return "#FF9999";
}

function between(x, min, max) {
  return x >= min && x <= max;
}

module.exports = server;
