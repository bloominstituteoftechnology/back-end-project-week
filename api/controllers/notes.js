const Note = require('../models/noteModels');

const getAllNotes = (req, res) => {
    const { user } = req.body;
    Note.find({ user })
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json({ error: 'Error fetching notes' }));
};

const addNote = (req, res) => {
    const { title, text, user } = req.body;
    if (title && text && user) {
        const newNote = new Note({ title, text, user });
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

const editNote = (req, res) => {
    const { title, text, _id } = req.body;
    if (title && text && _id) {
        Note.findOneAndUpdate({ _id }, { title, text })
        .then(note => res.send(note))
        .catch(err => {
            res.status(422).send('Error editing the note');
        });
    } else {
        res.status(422).send('Please send valid title, text and/or id for the note');
    };
};

const deleteNote = (req, res) => {
    const { id } = req.params;
    if (id) {
        Note.findOneAndRemove({ _id: id })
            .then(note => res.send(note))
            .catch(err => {
                res.status(422).send('Error deleting the note');
            });
    } else {
        res.status(422).send('Please send id for the note');
    };
};

module.exports = {
    getAllNotes,
    addNote,
    editNote,
    deleteNote,
};
