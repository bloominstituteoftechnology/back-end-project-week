
const notesDB = require('../database/helpers/noteDb');

module.exports = server => {
    server.get('/', getAllNotes);
    server.post('/', addNote);
    server.put('/:id', updateNote);
    server.delete('/:id', deleteNote);
}

const addNote = async (req, res) => {
    const note = req.body;

    if(note.title && note.description && note.user_id) {
        const posted = await notesDB.add(note);
        res.status(201).json(posted);
    } else {
        res.status(401).json({ message: 'The note is missing data' })
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesDB.get();
        res.status(200).send(notes);
    } catch(e) {
        res.status.send(e);
    }
};

const updateNote = async(req, res) => {
    const { id } = req.params;
    const newNote = req.body;
    newNote.id = id;

    if(note.title && note.description && note.user_id) {
        const updated = await notesDB.update(id, newNote);
        res.status(200).json(updated);
    } else {
        res.status(401).json({ message: 'The note is missing data' });
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    const deleted = await notesDB.remove(id);
    res.status(200).json(deleted);
};