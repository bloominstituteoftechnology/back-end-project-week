//dependencies
const notes = require('../data/notesModel.js')
const express = require('express')
const server = express()
const cors = require('cors')
const db = require('../data/dbConfig');

//call dependencies
server.use(express.json())
server.use(cors())
//endpoints

//gets
server.get('/get/all', (req, res) => {
    notes.get()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ message: 'There was an error retrieving the notes' }));
});

server.get('/get/:id', (req, res) => {
    const { id } = req.params
    notes.get(id)
        .then(note => res.status(200).json(note))
        .catch(err => res.status(500).json(err))
})

//post
server.post('/create', async (req, res) => {
    const { title, content } = req.body;
    const note = { title, content }
    if (title && content) {
        try {
            const id = await db('notes').insert(note);
            res.status(201).json(id[0]);
        } catch (err) {
            console.log(err) &&
                res.status(500).json({ message: 'The note could not be saved' });
        }
    } else {
        res.status(400).json({ message: 'Both a title and a body are required to add a note' });
    }
});

//put
server.put('/edit/:id', (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    if (title && content) {
        notes.update(id, req.body)
            .then(result => result ? res.status(200).json(result) : res.status(500).json({ message: 'No note updated.' }))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(422).json({ message: 'Please enter note title and content.' })
    }
})

//delete
server.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    notes.remove(id)
        .then(result => result ? res.status(200).json(result) : res.status(500).json({ message: 'No notes deleted.' }))
        .catch(err => res.status(500).json(err))
})
module.exports = server;