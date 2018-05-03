const Note = require('../models/noteModel');
const User = require('../models/userModel');

const viewNoteAccount = (req, res) => {

    User
        .findById(req.params.id)
        .populate('notes')
        .then(user => {
            console.log(user.notes)
            if (!user) {
                res.status(404).json({ errMsg: "User Not Found" });
            } else {
                res.status(200).json(user);
            }

        })
};


const createNote = (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params
    const noteEntry = new Note({ ...req.body, user_id: id });

    if( !title && !content ) {
        res.status(400).json({ errMsg: "Please enter a title and description." });
    } else {

        User 

            .findById(id)
            .then(user => {
                if ( !user ) {
                    res.status(404).json({ errMsg: "User Not Found." });
                } else {
                    
                    noteEntry
                        .save()
                        .then(newNote => {
                            user.notes = {...user.notes, newNote}
                            res.status(201).json(newNote);
                        })
                        .catch(err => {
                            res.status(500).json({ errMsg: "Note Not Saved" });
                        })
                }
            })
            .catch(err => {
                res.status(500).json({ errMsg: "Error finding User" });
            })
    }
}

const fetchNote = (req, res) => {

    Note
        .findById(req.params.id)
        .then(noteEntry => {
            if (!req.params.id) {
                res.status(404).json({ errMsg: "Note Entry Not Found" });
            } else {
                res.status(200).json(noteEntry);
            }
        })
        .catch(err => {
            res.status(500).json({ errMsg: "There was an error with the server" });
        })
}

const updateNote = (req, res) => {
    const { title, content } = req.body;

    Note 
        .findByIdAndUpdate(req.params.id, req.body) 
        .then(updatedNote => {
            if( !note ) {
                res.status(404).json({ errMsg: "Note Entry Not Found" });
            } else {
                res.status(200).json(updatedNote);
            }
        })
        .catch(err => {
            res.status(500).json({ errMsg: "There was an issue with the server" });
        })
}

const deleteNote = (req, res) => {
    const { id } = req.params
    Note
        findByIdAndRemove(id, (err, deletedNote) => {
            if (err) {
                res.status(500).json(err);
            }
                res.status(200).json({ errMsg: "Note Entry Successfully Deleted" });
        })
}

module.exports = {
    createNote,
    fetchNote,
    updateNote,
    deleteNote,
    viewNoteAccount,
};