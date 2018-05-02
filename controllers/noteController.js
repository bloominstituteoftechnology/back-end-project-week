const Note = require('../models/noteModel');

const noteList = (req, res) => {

    Note
        .find()
        .then(notesList => {
            res.status(200).json(notesList);
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Could not retrieve notes" });
        })
}

const singleNoteView = (req, res) => {

    Note
        .findById(req.params.id)
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Could not retrieve note" });
        })
}

const createNote = (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    note
        .create()
        .then(newNote => {
            res.status(201).redirect(newNote)
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Error creating new note." });
        })
}

const updateNote = (req, res) => {
    const { title, content } = req.body;

    Note 
        .findByIdAndUpdate(req.params.id, (err, updatedNote) => {
            if (err || Note === null) {
                res.status(500).json({ errMsg: 'Error retreiving selected note' })
            } else {
                res.status(200).json(updatedNote);     
            }
        })
}

const deleteNote = (req, res) => {
    
    Note
        findByIdAndRemove(req.params.id, (err, deletedNote) => {
            if (err) {
                res.status(500).json(err);
            }
                res.status(200).redirect('/:id/notes');
        })
}

module.exports = {
    noteList,
    singleNoteView,
    createNote,
    updateNote,
    deleteNote,
};