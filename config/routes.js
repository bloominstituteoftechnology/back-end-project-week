
const notesDB = require('../database/helpers/noteDb');

module.exports = server => {
    server.get('/', getAllNotes);
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesDB.get();
        res.status(200).send(notes);
    } catch(e) {
        res.status.send(e);
    }
}