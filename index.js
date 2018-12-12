const express = require('express'); 
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');
// const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const server = express();

//Initialize db
const db = knex(knexConfig.development);

//Connect Middleware to Server 
server.use(helmet(), express.json());

server.use(cors());

// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's QiGongGO!")
});

// GET Notes: display list of notes

server.get('/api/notes', (req, res) => {
    db('notes') 
    .then(notes=> { 
      res.status(200).json(notes);
    }) 
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "User notes not available." });
    });
});

// View an existing note.

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params; 
    db('notes')
    .where({ id })
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err));
  });


  // POST notes: create a note with title && content

server.post('/api/notes', async (req, res) => {
    const note = req.body;
    
    if (!note.title || !note.content) {
        const err = "Please provide title and content for note."; 
        res.status(400).json({err});
        return
    }

    try {
        await db('notes').insert(note);
    
    } catch (err) {
            res.status(500).json({err: "Error while saving to database."});
            return      
    }
        res.status(201).json(note);
        return
    });

// POST Action: saves new action to database. Will need ID to work.

server.post('/api/actions/:id', async (req, res) => {
    const { id } = req.params; 
    const action = req.body;
    const charLimit = 188;
    let addAction;
  
    if (!action.project_id || action.project_id !== id || action.project_id === "" ) {
        const err = "Please provide correct project ID."; 
        res.status(400).json({ err });
        return
    } 
  
    if (!action.description|| action.description==="" || !action.notes || action.notes===""  ) {
        const err = "Please input a note and description for the project."; 
        res.status(400).json({ err });
        return
    }  

    if (action.description.length > charLimit) {
        const err = "Please provide description under 188 characters."; 
        res.status(400).json({ err });
        return
    }  

    try {
        addAction = await db('actions').insert(action)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error while trying to save to database." });
        return      
    }

    res.status(201).json(addAction);
        return
});


// DELETE notes: delete an existing note.

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .del()
        .then(deleted => {
        res.status(200).json({ deleted });
        })
        .catch(err => res.status(500).json(err));
});

// PUT notes: edits a note.

server.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const noteEdit = req.body;

    db('notes')
    .where({ id })
    .then(note => { 
        if (!note) { 
           res.status(404).json({ message: "Note with provided ID is not available." });
           return  
          }
         })
         .catch(err => {
            res.status(500).json({ err: "Note info not available." });
         });
          
        if (!noteEdit.title || !noteEdit.content) {
          res.status(400).json({ err: "Please input note title and content." });
          return
        } 

        try {
          await   db('notes')
          .where({ id })
          .update(updates)
        } catch (err) {
            console.log(err)
            res.status(500).json({ err: "Error saving to database." });
            return      
        }
            res.status(201).json(updates);
            return
      })

server.listen(8888, () => console.log('\nrunning on port 8888\n'));