const express = require('express');
const server = express();
const db = require('./data/dbHelpers');

server.use(express.json());

const PORT = 5050

//--------------------Create-------------------------

server.post('/api/notes', (req, res) => {
    const note = req.body;
    if(note.title && note.note) {
        db.insert(note)
            .then(noteInfo => {
                db.findById(noteInfo.id)
                    .then(note => {
                        res.status(201)
                            .json(note);
                    })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "Failed to insert note into Database."})
            })
    } else {
        res
            .status(400)
            .json({ message: "Please provide title and content for your note"})
    }
})

//--------------------Read---------------------------

server.get('/api/notes', (req, res) => {
    db.find()
        .then(notes => {
            if(notes > 0) {
                res.json(notes)
            } else {
                res.json({ message: "There are currently no notes"})
            }
        })
        .catch(err => {
            res.status(500)
                .json({ err: 'The notes information could not be retrieved' })
        })
})

server.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(note => {
            if(note === 1) {
                res.json(note);
            } else {
                res.status(404)
                    .json({ message: 'The note with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ message: "The note information could not be returned" })
        })

})

//--------------------Update-------------------------

//--------------------Destroy------------------------

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if(count) {
                res.json({ message: "Note was successfully deleted"})
            } else {
                res.json({ message: "The post with the specified ID does not exist"})
            }
        })
        .catch( err => {
            res.status(500)
                .json({ message: "The post could not be removed"})
        })
})

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})