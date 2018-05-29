const Note = require('../note/NoteModel');
const bcrypt = require('bcrypt');

const createNote = (req,res) => {
    const {username, password} = req.body;
    const user = new User({username, password});
    user
        .save()
        .then(user => res.status(201).send(user))
        .catch(err => res.status(500).send(err));
};

module.exports = {
    createNote
};