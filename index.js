const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const server = express();
server.use (express.json())
server.use(helmet());

const dbConfig = require('./knexfile'); 
const db = knex(dbConfig.development); 

server.get("/", (req, res) => {
    res.status(200).json({message: "Test"})
})

server.get("/api/notes", (req, res) => {
    db('notes').then(notes => {
        res.status(200).json(notes); 
    }).catch(err => {
        res.status(500).json({error: "Cannot retrieve notes"})
    })
});

server.get("/api/notes/:id", (req, res) => {
    const { id } = req.params; 
    db("notes")
    .where({id})
    .then(note => res.status(200).json(note))
    .catch (err => {
        res.status(500).json({error: "Cannot retrieve notes"})
    });
})

server.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ error: 'Note title and content required' });
        return;
    }
    db.insert(newNote)
        .into('notes')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch (err => {
            res.status(500).json({error: "Cannot retrieve notes"})
   });
})

server.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    db("notes")
      .where({ id })
      .del()
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

server.listen(3000, () => console.log("server listening at port 3000"));
