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
            res.json(notes)
        })
        .catch(err => {
            res.status(500)
                .json({ err: 'The notes information could not be retrieved' })
        })
})

//--------------------Update-------------------------

//--------------------Destroy------------------------

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})