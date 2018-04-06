const Note = require('../models/noteModels');

const getAllNotes = (req, res) => {
    Note.find({})
        .then(p => p.json())
        .then(notes => console.log(notes), res.json(notes))
        .catch(err => res.status(500).json({ error: 'Error fetching notes' }));
};

const addNote = (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = new Note({ title, text });
        newNote
            .save()
            .then(note => res.send(note))
            .catch(err => {
                res.status(422).send('Error saving the note');
            });
    } else {
        res.status(422).send('Please send valid title and text for the note');
    }
};

module.exports = {
    getAllNotes,
    addNote,
};
