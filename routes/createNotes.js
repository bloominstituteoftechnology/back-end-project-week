const Note = require('../note/NoteModel');
const bcrypt = require('bcrypt');

const createNote = (req,res) => {
    const {title, }
    if (req.decoded) {
        console.log('success, token authenticated, created new note')
        
    }   else {
        return res.status(422).json({error: `Error can't create the note`})
    }
}