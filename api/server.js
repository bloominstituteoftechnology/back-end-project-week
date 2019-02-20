const express = require('express');

const cors = require('cors');

const notes = require('../notes/notesModel.js');

const server = express();

server.use(express.json(), cors());


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
server.get('/note/view/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const note = await notes.findById(id);

      if (note.length > 0) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: `Note doesn't exist` });
      }

  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

// Edit an existing note
server.put('/note/edit/:id', async (req, res) => {
  try {
    const noteChanges = req.body;
    const { id } = req.params;

    if (noteChanges.title && noteChanges.textBody) {
      const array = await notes.update(id, noteChanges);
      console.log(array[0]);
      res.status(200).json(array[0]);
    } else {
      res.status(422).json({ error: "Body missing info" });
    }

  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

// Delete an existing note
server.delete('/note/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const count = await notes.remove(id);
      res.status(200).json({ message: `${count} note successfully deleted` });
    } else {
      res.status(404).json({ error: `Note doesn't exist` })
    }

  } catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

module.exports = server;