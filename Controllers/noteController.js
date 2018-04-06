const Note = require('./Models/noteModel');

const createNote = (req, res) => {
    const { title, content } = req.body;
    const { username } = req.session.username;
    const newNote = new Note({ title, content, username });
    newNote.save(newNote, (err, savedNote) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(savedNote);
    });
};

const getAllNotes = (req, res) => {
    Note
    .find({})
    .where({ username = req.session.username })
    .exec()
    .then(notes => {
        if (notes.length === 0) throw new Error();
        res.json(notes)
    })
    .catch(err => res.status(422).json(err));
};

module.exports = {
    getAllNotes,
    createNote
};