const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.send('We have liftoff, up and running now...');
});

server.get('/notes/:_id', (req, res) => {
    const { id } = req.params;

    db('notes')
    .where({ id })
    .first()
    .then(notes => {
        if(notes) {
            db('actions')
            .where({ notes_id: id })
            .then(actions => {
                notes.actions = actions;

             res.status(200).json(notes)
            })
            .catch(err => res.json(err));
    } else {
        res.status(404).json({ message: 'nope, did not locate note' })
    }
})
    .catch(err => res.json(err));
});

server.get('/actions', (req, res) => {
    db('actions')
    .then(actions => {
        res.status(200).json(action)
    })
    .catch(() => {
        res.status(500).json({ message: "action not found" })
    })
});

server.post('/notes', (req, res) => {
    const note = req.body;
  
    db
    .insert(note)
    .into('notes')
    .then(ids => {
      const id = ids[0];
       res.status(201).json({ id, ...note });
    })
    .catch(err => res.status(500).json(err));
  });

  server.put('/notes/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('notes')
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
  
        db('notes')
        .select('title')
        .where({ id })
        .then(note => {
          res.status(200).json(note);
        })
        .catch(err => {
          res.status(500).json(err);
        })
      } else {
        res.status(404).json({ message: 'The note was not found'});
      }
   })
    .catch(err => res.status(500).json(err))
  });
  
  server.delete('/notes/:id', (req,res) => {
    const { id } = req.params;
  
    db('notes')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err))
  });

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
