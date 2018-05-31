const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const Note = require('./models/notes/Note');
const User = require('./models/users/User');

const envUser = process.env.USER_NAME;
const envPass = process.env.PASSWORD;
const port = process.env.PORT || 3333;
const server = express();

const whitelist = ['https://lambda-notes-project.netlify.com', 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

mongoose
  .connect(`mongodb://${envUser}:${envPass}@ds239940.mlab.com:39940/lambda-notes`)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database');
  });

server.use(cors(corsOptions));
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

server.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => res.json(note))
    .catch(err => res.status(500).json(err));
});

server.route('/notes')
  .get((req, res) => {
    Note.find()
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  })
  .post((req, res) => {
    const { title, body } = req.body;
    const note = new Note({ title, body });

    Note.ceate(note, (note, err) => {
      if(err) res.status(201).json(err);
      else res.status(500).json(note);
    });
  })
  .delete((req, res) => {
    Note.findByIdAndRemove(req.body.id)
      .then(() => res.json('Note successfully deleted'))
      .catch(err => res.status(500).json(err));
  })
  .put((req, res) => {
    const { id, title, body } = req.body;

    Note.findByIdAndUpdate(id, { title, body })
      .then(() => res.json('Note successfully updated'))
      .catch(err => res.status(500).json(err));
  });

  server.route('/users')
    .get((req, res) => {
      User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
    })
    .post((req, res) => {
      const user = new User(req.body);

      user.save((user, err) => {
        if(err) res.status(201).json(err)
        else res.status(500).json(user);
      });
    })
    .delete((req, res) => {
      User.findByIdAndRemove(req.body.id)
        .then(() => res.json('User successfully deleted'))
        .catch(err => res.status(500).json(err));
    });

server.listen(port, err => {
  if(err) console.log(err);
  console.log(`Magic happening on ${port}`);
});