const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const cors = require('cors');
const db = require('knex')(require('../knexfile').development);
const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(morgan('short')); 



//********************** NOTES CRUD **********************// 

//----- GET notes -----
//Display a list of notes.
server.get('/api/notes', (req, res) => {
    db('notes') 
    .then(notes=> { 
      res.status(200).json(notes);
    }) 
    .catch(err => {
        console.log(err)
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//View an existing note.
server.get('/api/notes/:id', (req, res) => {
    const note = req.body;
    const { id } = req.params; 
 
    db('notes')
    .where({ id:id })
    .then(notes => {
        if (!notes.length) {
            res.status(404).json({ message: "The note with the specified ID does not exist." });
        return  
        } else {
        res.status(200).json(notes)
        }
    })
    .catch(err => res.status(500).json(err));
})

//----- POST notes -----
//Create a note with a title and content.
server.post('/api/create', async (req, res) => {
const noteData = req.body;

if (!noteData.title || !noteData.content) {
    const errorMessage = "Please provide both title and contents for the note"; 
    res.status(400).json({ errorMessage});
    return
}
try {
    await db('notes').insert(noteData);

} catch (error) {
        res.status(500).json({ error: "There was an error while saving the note to the database" });
        return      
}
res.status(201).json(noteData);
return
});

//----- PUT notes -----
//Edit an existing note.
server.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const noteUpdates = req.body;
    if (!noteUpdates.title || !noteUpdates.content) {
          const errorMessage = "Please provide both a title and content for the note"; 
          res.status(400).json({ errorMessage });
          return
    }     
    
    db('notes')// does the note exist in order to change it?
    .where({ id:id })
    .then(notes => {
        if (!notes.length) {
            res.status(404).json({ message: "The note with the specified ID does not exist." });
            return  
        }
    });

    try {// it does! let's update it 
        await   
        db('notes')
        .where({ id:id })
        .update(noteUpdates)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the note to the database" });
        return      
      }
      res.status(201).json(noteUpdates);
      return
      });

//----- DELETE notes -----
//Delete an existing note.
server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
      .where({ id:id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json(err));
  });
      

module.exports = server;