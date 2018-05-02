const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Note = require('./models/note');

const server = express();

const middleware = require('./middleware.js')(server);
const UserRoutes = require('./Controllers/userRoutes.js')(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('\n==== Connected to Mongo ====\n');
  })
  .catch(() => {
    console.log('\n++++ ERROR connecting to Mongo ++++\n');
  });

// Notes Controllers
server.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.json({ err: err.message });
    });
});

// POST
server.post('/api/notes', (req, res) => {
  const note = new Note(req.body);

  note
    .save()
    .then(savedNote => {
      res.json(savedNote);
    })
    .catch(err => {
      console.log(err.message);
    });
});

// DELETE
server.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(response => {
      Note.find({})
        .then(notes => {
          res.json(notes);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});
// PUT
server.put('/api/notes/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
