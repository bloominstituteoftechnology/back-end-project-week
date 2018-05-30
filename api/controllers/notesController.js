const Note = require('../models/noteModel');

const createNote = async function (req, res) {
    const { author, title, body } = req.body;
    const note = new Note({ author, title, body });
    try {
        const savedNote = await note.save();
        res.json({ status: 'success', savedNote });
    }
    catch (err) {
        console.log(err);
        res.status(422).json({ status: err });
    };
};

const listNotes = async function (req, res) {
    const { _id } = req.params;
    
    if (!_id) return res.status(422).json({ error: 'No id' });

    try {
        const allNotes = await Note.find({
            author: _id,
        });
        res.json({ status: 'success', allNotes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: err });
    };
};

const editNote = async function (req, res) {
    const { _id, title, body } = req.body;

    if (!_id || !title || !body) return res.status(422).json({ error: 'Needs _id, title, and body.' });

    try {
        const updatedNote = {
            title,
            body,
        };
        const foundNote = await Note.findById(_id);
        if (!foundNote) return res.status(422).json({ error: 'No note with that ID found' });
        await Note.updateOne(foundNote, updatedNote);
        res.json(updatedNote);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: err });
    };
};

const deleteNote = async function (req, res) {
    const { _id } = req.params;

    try {
        const noteToDelete = await Note.findById(_id);
        if (!noteToDelete) return res.status(422).json({ error: 'No note with that ID found' });
        await Note.deleteOne(noteToDelete);
        res.json({ deleted: noteToDelete });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: err });
    };
};

module.exports = {
    createNote,
    listNotes,
    editNote,
    deleteNote,
};
