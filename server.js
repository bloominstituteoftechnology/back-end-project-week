// Frameworks
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

// Components
const noteController = require('./notes/noteController');
const User = require('./users/userModel');

// Connect to the database
mongoose
  .connect('mongodb://boaz:wasruthless@ds139970.mlab.com:39970/my-bible-app')
  .then(mongo => {
    console.log('connected to database');
  })
  .catch(err => {
    console.log('Error connecting to the database', err);
  });

// Uses
const server = express();
server.use(helmet());
server.use(cors({}));
server.use(bodyParser.json());
server.use('/api/notes', noteController);

// User Authentication
function authenticate(req, res, next) {
  if(req.session && req.session.username) {
    next();
  } else {
    res.status(401).send('MENE MENE TEKEL UPHARSIN');
  }
}

server.use(
  session({
    secret: 'The goodness of God leadeth thee to repentence.',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'GodIsWatchingYou',
    store: new MongoStore({
      url: 'mongodb://boaz:wasruthless@ds139970.mlab.com:39970/my-bible-app',
      ttl: 60 * 10,
    })
  })
);

server.get('/api/users', authenticate, (req, res) => {
  User.find().then(users => res.send(users));
});

server.post('/api/register', function(req, res) {
  const user = new User(req.body);
  user
    .save()
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err));
})

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(user => {
      if (user) {
        user.isPasswordValid(password).then(isValid => {
          if (isValid) {
            req.session.username = user.username;
            res.send('Cookie has been created.');
          } else {
            res.status(401).send('That username/password combination does not exist.');
          }
        })
      }
    })
    .catch(err => res.send(err));
});


// Basic get test
server.get('/', (req, res) => {
  res.json({ Message: "Hello.  You're not supposed to be here." });
});

// Open server to port
const port = process.env.PORT || 3333;
server.listen(port, err => {
  if(err) console.log(err);
  console.log(`API connected on ${port}`);
})