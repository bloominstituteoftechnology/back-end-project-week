const Note = require('../models/noteModels');

const getAllNotes = (req, res) => {
    const { user } = req.body;
    Note.find({ user })
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json({ error: 'Error fetching notes' }));
};

const addNote = (req, res) => {
    const { title, text, user } = req.body;
    console.log('reaches addNote in controllers?');
    if (title && text && user) {
        const newNote = new Note({ title, text, user });
        newNote
            .save()
            .then(note => { console.log('reaches save/then', note); res.send(note); })
            .catch(err => {
                res.status(422).send('Error saving the note');
            });
    } else {
        res.status(422).send('Please send valid title and text for the note');
    }
};

// const editNote = (req, res) => {

// }

module.exports = {
    getAllNotes,
    addNote,
    // editNote,
};
