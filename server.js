const express = require('express');
const session = require('express-session');
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');
const Note = require('./notes');
const User = require('./user.js');

mongoose
  .connect('mongodb://sumi:cupcakes@ds163769.mlab.com:63769/sumayyah-back-end-project', {
    // useMongoClient: true,
  })
  .then(() => {
    console.log('connected to the mongo database');
    server.listen(5000);
  })
  .catch((err) => console.log(err));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(
  session({
    name: 'Back-end',
    secret: 'BkzpKTwCM6I6k3EwvL6GaoXXHpmmtgbjgmCCA0SvgnYgfFwERKLIDyWbaFQTNfIM',
    httpOnly: true,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    secure: false,
  })
);

server.use(cors(corsOptions));

// this is the get request that our front end was looking for
// once you find it then send back notes
server.get('/api/notes', (req, res) => {
  Note.find({})
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cannot find your notes' });
    });
});

server.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cannot find your note' });
    });
});

server.put('/api/notes/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedNote) => {
      res.status(200).json(updatedNote);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cannot update your notes' });
    });
});

server.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = new Note({ title, text });
  newNote
    .save()
    .then((savedNote) => {
      res.status(200).json(savedNote);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  Note.findByIdAndRemove(id)
    .then((deleted) => {
      res.status(200).json(deleted);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Note didnt get deleted' });
    });
});

server.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

server.post('api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.status(422).json({ err: 'You must enter a valid username' });
  User.findOne({ username })
    .then((response) => {
      if (response) {
        response
          .isPasswordValid(password)
          .then((response) => {
            if (response) {
              req.session.name = username;
              res.status(200).json({ success: true });
            } else {
              res.status(422).json({ err: "Password didn't match" });
            }
          })
          .catch((err) => {
            console.log(err.message, 'err message');
            res.status(422).json({ err: "Couldn't check password" });
          });
      } else {
        res.status(422).json({ err: 'User is null' });
      }
    })
    .catch((err) => res.status(500).json({ err: 'Server is not connected' }));
});

server.post('api/logout', (req, res) => {
  const username = req.session.name;
  if (username) {
    req.session.destroy;
    res.status(200).json({ message: 'You are logged out :)' });
    return;
  } else {
    return res.status(422).json({ err: 'You arent logged out' });
  }
});

module.exports = { server };
