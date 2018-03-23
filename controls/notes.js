const Note = require('../models/notes');
const User = require('../models/user');

const getNotes = (req, res) => {
    if (!req.decoded) {
        res.status(404).json({ error: 'Must log in first to view notes' });
    } else {
        User.findOne({ email: req.email })
            .then(user => {
                id = user._id;
                Note.find({ author: id })
                    .then(notes => {
                        res.json(notes);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
};

const addNote = (req, res) => {
    const { title, content } = req.body;
    const author = req.author;
    const email = req.email;

    if (!req.decoded) {
        res.status(404).json({ error: 'Must log in first to view notes' });
    } else {
        User.findOne({ email })
            .then(user => {
                const newNote = new Note({
                    title,
                    content,
                    author: user._id
                });
                newNote
                    .save()
                    .then(note => {
                        res.status(201).json(note);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
};

const updateNote = (req, res) => {
    const { id, title, content } = req.body;
    const updateNote = {
        title,
        content
    };

    if (!req.decoded) {
        res.status(404).json({ error: 'Must log in first to view notes' });
    } else {
        Note.findByIdAndUpdate(id, updateNote, { new: true })
            .then(note => {
                res.json(note);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
};

const deleteNote = (req, res) => {
    const { id } = req.body;

    if (!req.decoded) {
        res.status(404).json({ error: 'Must log in first to view notes' });
    } else {
        Note.findByIdAndRemove(id)
            .then(note => {
                res.json({ success: 'Note successfully deleted' });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
};

module.exports = {
    getNotes,
    addNote,
    updateNote,
    deleteNote
};
