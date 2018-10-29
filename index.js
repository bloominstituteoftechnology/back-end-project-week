const express = require('express');
const knex = require('knex');
const cors = require('cors');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());

server.get('/server', (req, res) => {
  res.send('***THIS SERVER IS RUNNING***')
});

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post('/api/notes', (req,res) => {
    const note = req.body;
    db.insert(note).into('notes')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/notes/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const note = await db('notes')
      .where({id})
      .first();
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({message: 'Note not found'});
      }
    } catch (error) {
      res.status(500).json(err);
    }
});

server.put('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db('notes').where({id}).update(changes)
    .then(count => {
      if(!count || count < 1) {
        res.status(404).json({message: 'No records found to update'});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where({id}).delete()
    .then(count => {
      if(!count || count < 1) {
        res.status(404).json({message: 'No notes found to delete'});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


const port = 9000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});