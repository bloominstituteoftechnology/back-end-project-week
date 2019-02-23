const express = require('express');
const server = express();
const db = require('./data/dbHelpers');
const cors = require('cors');


server.use(express.json());
server.use(cors());


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
            if(notes.length > 0) {
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
            if(note.length === 1) {
                res.json(note);
            } else {
                res
                    .status(404)
                    .json({ message: 'The note with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ message: "The note information could not be returned" })
        })

})

//--------------------Update-------------------------

server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const note = req.body;
    if(note.title && note.note) {
        db.update(id, note)
            .then(updatedNote => {
                console.log(updatedNote)
                if(updatedNote) {
                    db.findById(id)
                        .then(note => {
                            
                            res.json(note);
                        })
                } else {
                    res
                        .status(404)
                        .json({ message: "The post with the specified ID does not exist"})
                }
            })
            .catch( err => {
                res
                    .status(500)
                    .json({ message: 'The note could not be updated'})
            })
    } else {
        res
            .status(400)
            .json({ message: "Please provide a title and note to be updated" });
    }
})

//--------------------Destroy------------------------

server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
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