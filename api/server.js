const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);



// Add middleware nameChecker

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
// POST: .insert() .into
server.post('/CreateNewView', (req, res) => {
  const { title, textBody } = req.body;

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







server.get('/', (req, res) => {
  res.json({ api: 'Lambda Notes (Backend): running' });
});

module.exports = server;



