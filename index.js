const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');

const server = express();
const db = knex(dbConfig.development);
const PORT = 3000;

// CORS stuff
const cors = require('cors')
server.use(cors())

server.use(express.json());  //body parser middleware

server.get('/', (req , res) => {
    res.status(200).json({api: "Lambda Notes Backend!"})
})

// DB HELPERS IMPORT
const dbHelpers = require('./data/db_helpers');

// Regular GET NOTES -- works.
server.get('/notes', (req , res) => {
    dbHelpers.getNotes()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to get Notes'})
    })
})





///////// many to many AND joins table ////////////
// Regular Get ALL notes_tags (does NOT show tagTitle)
// server.get('/notes_tags', (req, res) => {
//     dbHelpers.getNotesTags()
//     .then(rows => {
//         res.json(rows)
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({err: "Failed to retrieve all entries from Notes_Tags table"})
//     })
// })



// GET note by ID w db Helpers
server.get('/notes/:id', (req, res) => {
    const {id} = req.params;
    dbHelpers.getNotesById(id)  // db helpers
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find specific NOTE by ID"});
    })
})




//EDIT existing note
server.put('/notes/:id', (req, res) => {
    const {id} = req.params;
    const note = req.body;

    db('notes').where('id', id).update(note)
    .then(rowCount => {
        res.status(200).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to Update specific NOTE"});
    })
})

//DELETE existing note
server.delete('/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete Note"})
    })
})

///Experiement - just post NOTES, then Tags, then Post Notes_Tags
server.post('/notes', (req , res) => {
    const note = req.body;
    dbHelpers.insertNote(note)
    .then(note => res.status(201).json(note))
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Error posting individual NOTE to the database"})
    })
})





/// Experiment - Post Notes WITH Tags
// server.post('/notes', (req, res) => {
//     const note = req.body;
//     const tag = req.body.tag;

//     delete note.tag;

//     console.log('note info', note)
//     console.log('tag info', tag)

//     //db.insertNoteTag(note, tag)
//     dbHelpers.insertNoteTag(note, tag)
//         .then(note => res.status(201).json(note))
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({error: "There was an error saving note to the database"});
//         });
// })


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})