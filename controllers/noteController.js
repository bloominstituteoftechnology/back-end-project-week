const Note = require('../models/noteModel');

const getNotes = (req, res) => {

    User
        .findById(req.params.id)
        .then(noteList => {
            let noteId = note.id;

            Note
                findById(req.params.id)
                .then(noteList => {
                    res.status(200).json(noteList);
                })
                .catch(err => {
                    res.status(500).json({ errMsg: 'Could not retrieve notes.' });
                })
        })
        .catch(err => {
            res.status(404).json(err);
        })
}

const createNote = (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    note
        .create()
        .then(res => {
            res.status(201).redirect('/:id/notes/:id')
        })
        .catch(err => {
            res.status(500).json({ errMsg: "Error creating new note." });
        })
}

const updateNote = (req, res) => {
    
}