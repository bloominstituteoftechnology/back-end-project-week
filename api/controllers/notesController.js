const Note = require('../models/noteModel');

const createNote = async function(req, res) {
    const { author, title, body } = req.body;
    const note = new Note({ author, title, body });

    const savedNote = await note.save
}