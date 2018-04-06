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

const getNoteById = (req, res) => {
    const { id } = req.params;
    Note
    .findById(id)
    .populate('username')
    .exec()
    .then(singleNote => {
        if (singleNote === null) throw new Error();
        res.json(singleNote);
    })
    .catch(err => res.status(422).json(err));
};

const updateNote = (req, res) => {
    const { title, content } = req.body;
    if (!title || !id) {
        return res.status(422).json({ error: 'Must provide a title and content'});
    }
    Note.findById(id, (err, note) => {
        if (err || game === null) {
            return res.status(422).json({ error: 'Cannot find note by that id'});
        }
        note.title = title;
        note.content = content;
        note.save((saveErr, updatedNote) => {
            if (err || note === null) {
                return res.status(500).json({ error: 'Something really bad happened' });
            }
            res.json(note);
        });
    });
};

const deleteNote = (req, res) => {
    let id = undefined;
    if (req.params.id) {
        id = req.params.id;
    }
    if (req.body.id) {
        id = req.body.id;
    }
    if (id === undefined) {
        return res.status(422).json({ error: 'You need to supply an id'});
    }
    Note.findByIdAndRemove(id, (err, removedNote) => {
        if (err) {
            return res.status(422).json({ error: 'Cannot find note by that id' });
        }
        res.json({ success: `${removedNote.title} was removed from the DB` });
    });
};

module.exports = {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote
};