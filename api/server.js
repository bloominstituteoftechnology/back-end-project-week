const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);



// Add middleware nameChecker
const titleTextChecker = require('../middleware/titleTextChecker.js')

const server = express();
server.use(express.json());


// TABLE SCHEMA
//  "id": 
//  "tags": ["tag", "otherTag"],
//  "title": "Note Title",
//  "textBody": "Note Body",

// ENDPOINTS

// endpoints here

//  Get All: "/" 
//  Post: '/CreateNewView'
//  Get Note by id '/note/:id'
//  Edit Note by id = '/note/edit/:id'
//  Delete Note by id = '/note/delete/:id'


// NOTES
// POST: .insert() 
server.post('/CreateNewView', titleTextChecker, (req, res) => {
  const { title, textBody } = req.body;
  // const noteTitle = { title };
  db('notes')
    .insert({ title, textBody })
    .then(ids => {
      res.status(201).json({ id: ids[0] });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error inserting',
        err
      })
    })
})

// GET (assumes .select())
server.get('/', (req, res) => {

  db('notes')
    //.select()
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json({
      err
    }));
});

// GET (assumes .select() .where id matches)
server.get('/note/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id: id })
    .then(notes =>
      notes[0] ?
      res.status(200).json(notes[0]) :
      res.status(404).json({
        error: "there is no note with that id",
        "log": console.log(id)
      })
    )
    .catch(err => res.status(500).json({
      err
    }));
});

server.put('/note/edit/:id', titleTextChecker, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('notes')
    .where({ id: id }) // 
    .update(changes)
    .then(count => {
      res.status(200).json({
        title: changes.title,
        textBody: changes.textBody
      });
    })
    .catch(err => res.status(500).json(err));
});







server.get('/api', (req, res) => {
  res.json({ api: 'Lambda Notes (Backend): running' });
});

module.exports = server;



