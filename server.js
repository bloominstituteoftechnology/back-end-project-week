const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const noteRouter = require('./backEnd/Routes/noteRoutes');
const userRouter = require('./backEnd/Routes/userRoutes');
const User = require('./backEnd/Models/userModel');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionConfig = {
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    }, // 1 day in milliseconds
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'noname',
    store: new MongoStore({
      url: 'mongodb://localhost/sessions',
      ttl: 60 * 10,
    }),
  };

const server = express();
server.use(cors({}));
server.use(express.json());
server.use(session(sessionConfig));


server.use('/api/notes', noteRouter)
server.use('/api/users', userRouter)


mongoose

.then(conn => {
    console.log('\n=== Connected to M-Lab Server! ===\n');
})
.catch(err => console.log('error connecting to mongo', err));



server.get('/', (req, res) => {
    if (req.session && req.session.username) {
      res.send(`welcome back ${req.session.username}`);
    } else {
      res.send('I DONT KNOW YOU!');
    }
  });

  server.post('/register', function(req, res) {
    const user = new User(req.body);
    user
      .save()
      .then(user => res.status(201).send(user))
      .catch(err => res.status(500).send(err));
  });

server.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then(user => {
        if (user) {
          // compare the passwords
          user.isPasswordValid(password).then(isValid => {
            if (isValid) {
              req.session.username = user.username;
              res.send('validated');
            } else {
              res.status(401).send('invalid password');
            }
          });
        } else {
          res.status(401).send('invalid username');
        }
      })
      .catch(err => res.send(err));
  });

server.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(function(err) {
        if (err) {
          res.send('error');
        } else {
          res.send('good bye');
        }
      });
    }
  });

const port = process.env.PORT || 5050;
server.listen(port, () => {
    console.log(`\n\n THUNDER CATS ARE GO ON http://localhost:${port}!!!`)
});
