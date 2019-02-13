const express = require('express');

const notes = require('../notes/notesModel.js');

const server = express();

server.use(express.json());


// Display a list of notes
server.get('/note/get/all', async (req, res) => {

})

// Create a note with a title and content
server.post('/note/create', async (req, res) => {
  
})

// View an existing note
server.get('/note/get/:id', async (req, res) => {
  
})

// Edit an existing note
server.put('/note/edit/:id', async (req, res) => {
  
})

// Delete an existing note
server.delete('/note/delete/:id', async (req, res) => {
  
})