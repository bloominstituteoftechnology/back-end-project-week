const express = require('express');

const notes = require('../notes/notesModel.js');

const server = express();

server.use(express.json());


// Display a list of notes
server.get('/note/get/all', async (req, res) => {
  try {
    const rows = await notes.getAll();

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

// Create a note with a title and content
server.post('/note/create', async (req, res) => {
  try {
    const noteData = req.body;

    if (noteData.title && noteData.textBody) {    
      const count = await notes.insert(noteData);

      res.status(201).json(count);

    } else {
      res.status(422).json({ error: 'Missing data' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }
  
})

// View an existing note
server.get('/note/get/:id', async (req, res) => {
    try {

  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

// Edit an existing note
server.put('/note/edit/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

// Delete an existing note
server.delete('/note/delete/:id', async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

module.exports = server;