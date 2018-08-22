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
    .then(notes => {
         res.status(200).json(notes)
    })
            .catch(err => res.json(err));
            res.status(404).json({ message: 'nope, did not locate note' })
});

server.get('/notes/get', (req, res) => {

    db('notes')
    .then(notes => {
        res.status(200).json(notes)
    })
    .catch(() => {
        res.status(500).json({ message: "notes not found" })
    })
});

server.post('/notes/create', (req, res) => {
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

  server.put('/notes/edit/:_id', (req, res) => {
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
  
  server.delete('/notes/delete/:_id', (req,res) => {
    const { id } = req.params;
  
    db('notes')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err))
  });

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
