const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

const createNote = async function (req, res) {
    const { userId, title, body } = req.body;
    const newNote = new Note({ title, body });
    try {
        const saveNote = await User
            .findByIdAndUpdate(userId, {$push: { notes: newNote }});
        res.status(201).send(saveNote);
    } catch(error) {
        console.log(error);
    };
};

const getNotes = async function (req, res) {
    const { uid } = req.params.id;
    try {
        const loggedInUser = await User.findById(uid);
        res.status(200).send(loggedInUser.notes);
    } catch (error) {
        console.log(error, 'There was an error retrieving the notes');
    };
};

const deleteNote = async function (req, res) {
    const noteId = req.params.id;
    const { userId } = req.params;
    try {
        const removeNote = await User
            .findByIdAndUpdate(userId, {$pull: {notes: { _id: noteId }}});
        res.status(200).send(deleteNote.notes);
    } catch(error) {
        console.log(error, 'There was an error deleting the note');
    };
};

const editNote = async function (req, res) {
    const noteId = req.params.id;
    const { userId } = req.params;
    const { title, body } = req.body;
    const updateNote = new Note({ title, body });
    try{
        const loggedInUser = await User.findById(userId);
        const newNotes = loggedInUser.notes.map( note => {
            if (note._id.toString() === noteId.toString()) return updateNote;
            else return note;
        });
        await User.findOneAndUpdate(
            { _id: userId },
            {$set: { notes: newNotes }}
        );
        const savedNotes = await User.findById(userId);
        res.status(200).send(savedNotes);
    } catch (error) {
        console.log(error, 'There was an error editing/updating the note');
    };
};

module.exports = {
    createNote,
    getNotes,
    deleteNote,
    editNote
};