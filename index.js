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

server.get('/notes', (req, res) => {
    db('notes')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to retrieve Notes'})
    })
});

/// Normal Post Notes (without Tags)
server.post('/notes', (req, res) => {
    const note = req.body;
    console.log('note info', note)
    db('notes').insert(note)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to insert note"});
    })
})

server.get('/tags', (req, res) => {
    db('tags')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to retrieve Tags'})
    })
})

///////// many to many AND joins table ////////////
// Regular Get ALL notes_tags (does NOT show tagTitle)
server.get('/notes_tags', (req, res) => {
    db('notes_tags')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to retrieve all entries from Notes_Tags table"})
    })
})

// JOINS notes_tags (SHOWS tagTitle)
server.get('/notes_tags_joins', (req , res) => {
    db('notes_tags').leftJoin('tags', 'tags_id', 'tags.id')
    .then(tagInfo => {
        res.send(tagInfo)
    })
    .catch(err => console.log(err))
})

// JOINS notes_tags (SHOWS title & textBody)
server.get('/notes_tags_joins_two', (req , res) => {
    db('notes_tags').leftJoin('notes', 'notes_id', 'notes.id')
    .then(tagInfo => {
        res.send(tagInfo)
    })
    .catch(err => console.log(err))
})

// GET note by ID
server.get('/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where('id', id)
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


///// Experiment - - render tags on frontend
server.get('/notes_ex', (req , res) => {
    db('notes').leftJoin('tags', 'notes_id', 'notes.id')
    .then(noteInfo => {
        res.send(noteInfo)
    })
    .catch(err => console.log(err))
})

/// Experiment - Post Notes WITH Tags
// server.post('/notes', (req, res) => {
//     const note = req.body;
//     const tags = req.body.tags;

//     delete note.tags;

//     console.log('note info', note)
//     console.log('tag info', tags)

//     db.insertNoteTag(note, tag)
//         .then(note => res.status(201).json(note))
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({error: "There was an error saving note to the database"});
//         });
// })

// NEED TO BE ADDED TO DB HELPERS
// insertNote: async function (note) {
//         return db('notes').insert(note)
// }

// insertTag: async function (tags) {
//     let tagIds = []

//     for (let tag of tags) {
//         const tagId = await db('tags').insert(tag)
//         tagIds.push(tagId)
//     }

//     return tagIds
// }


// insertNoteTag: function (note, tags) {
//     const promises = [this.insertNote(note), this.insertTags(tags)]

//     return Promise.all(promises).then(async (results) => {
//         let [noteId, tagIds] = results

//         for (let tagId of tagIds) {
//         await db('noteTags').insert({ tagId, noteId })
//         }

//         return this.get(noteId)
//     })
// }





server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})