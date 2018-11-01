const express = require('express');
const helmet = require('helmet');
const server = express();
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');
const port = process.env.PORT || 9000;


server.use(helmet(), cors());
server.use(express.json())


//routes

server.get('/', (req, res) => {
    res.json({ hello: "Server is up" })
})

server.get('/api/notes', (req, res) => {
    db('notes').then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err))
});

server.get('/api/notes/:id',  (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .first()
        .then(note => {
            if(note) {
            db('notes').where({ id: id }).then(note => {
                res.status(200).json(note)
            })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })} else {
            res.json({message: 'no note'})
        }})
})

server.post('/api/notes', (req, res) => {
    const note = req.body;
    db.insert(note)
      .into('notes').then(ids => res.status(201).json(ids))
      .catch(err => res.status(500).json(err))
  })

server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const updated = req.body;
    db('notes')
        .where({ id })
        .update(updated)
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json(err))
})

server.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .del()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json(err))
});


//server

server.listen(port, () => {
    console.log(`Server started on ${port}`);
})