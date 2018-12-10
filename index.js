const express = require('express');
const helmet = require('helmet')
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('Besh!');
});

server.get('/notes', (req, res) => {
    db('notes_table_two') // migrate
    .then(notes => {
        res.status(200).json(notes);
        console.log(notes);
    })
    .catch(err => {
        res.status(500).json({ err: 'Sorry, the list of notes could not be retrieved.', err });
    })
});

server.get('/notes/:id', (req, res) => {
    db('notes_table_two')
    .where({ id: req.params.id })
    .first()
    .then(note => {
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: 'Sorry, the note with the specified ID does not exist.' });
        }
    })
    .catch(err => 
        res.status(500).json({ err: 'Sorry, the note with the specified ID could not be retrieved.', err }));
    });

server.post('/notes/addnote', (req, res) => {
    const note = req.body;
    db.insert(note)
    .into('notes_table_two')
    .then(id => {
        res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: 'This not could not be added.', err });
    })
});


server.put('/notes/edit/:id', (req, res) => {
    const { id } = req.params;
    const newNote = req.body;
    db('notes_table_four')
    .where({ id })
    .update(newNote)
    .then(note => {
        if (!note || note < 1) {
            res.status(404).json({ message: 'The note with the specified ID does not exist.' });
        } else {
            res.status(200).json(note);
        }
    })
      .catch(err => {
        res.status(500).json({ error: 'This note could not be modified.', err });
      })
  });

server.delete('/notes/delete/:id', (req, res) => {
    db('notes_table_four')
    .where({ id: req.params.id })
    .del()
    .then(note => {
      if (note) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "The note associated with this ID does not exist." });
      }
    })
    .catch(err => 
        res.status(500).json({ err: 'This note could not be removed.'}));
});

const port = process.env.PORT|| 4443;
server.listen(port, () => console.log(`==== Party at port ${port} ====`));