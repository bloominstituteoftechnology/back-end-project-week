const express = require('express');
const Note = require('./notesModel.js');
const router = express.Router();

router
.get('/', (req, res) => {
Note
.find()
.then(notes => {
    res.status(200)
    res.json(notes)
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in fetching Notes" })
})
})

router
.get('/:id', (req, res) => {
const { id } = req.params;

Note
.findById(id)
.then(note => {
    res.status(200)
    res.json(note)
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in fetching Note" })
})
})

router
.post('/', (req, res) => {
const { title, content } = req.body;
const newNote = new Note({ title, content });

if(!title || !content) {
    res.status(400)
    res.json({ message: "Title or Content information missing" })
}
else { 
newNote
.save()
.then(savedNote => {
    res.status(200)
    res.json({ savedNote })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in creating new Note" })
})
}})

router
.put('/:id', (req, res) => {
const { id } = req.params;
const updatedNote = req.body;

Note
.findByIdAndUpdate(id, updatedNote, { new: true })
.then(updatedNote => {
    res.status(200).json({ updatedNote })
})
.catch(err => {
    sendUserError(500, err.message, res)
})
})

router
.delete('/:id', (req, res) => {
const { id } = req.params;

Note
.findByIdAndRemove(id)
.then(deletedNote => {
    res.status(200)
    res.json({ deletedNote })
})
.catch( err => {
    res.status(500)
    res.json({ message: "Error in deleting Note" })
})
})


module.exports = router