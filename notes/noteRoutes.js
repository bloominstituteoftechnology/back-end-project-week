const express = require("express");
const router = express.Router();

const Note = require('./NoteModel.js');
const User = require('../users/UserModel.js');

router
    .route("/")
    .get((req, res) => {
        Note.find()
            .populate("user", '-notes -_id -__v -password')
            .select('-__v')
            .then(notes => {
                res.json(notes);
            })
            .catch(err => {
                res.status(500).json([{ error: err.message }]);
            });
    })
    .post((req, res) => {
        const { title, content, userId } = req.body;
        if (!title || !content) {
            res.status(400).json([{ error: "Title and content required." }]);
            return;
        }
        User.findById(userId)
            .then(user => {
                if(!user) {
                    res.status(404).json('user not found!')
                } else {
                    const newNote = new Note({ title, content, user: userId });
                    newNote.save() //save works with schema only
                    .then(savedNote => {
                        user.notes.push(savedNote._id)
                        User.create(user)//save works with schema only, thats why we used create
                            .catch(err => {
                                res.status(500).json({ error: err.message })                                
                            })
                        res.status(201).json(savedNote)
                    })
                    .catch(err => {
                        res.status(500).json({ error: err.message })
                    })
                }
            })
            .catch(err => {
                res.status(500).json([{ error: err.message }]);
            });
    });

    router.
        route('/:id')
            .get((req, res) => {
                const { id } = req.params;
                Note.findById(id)
                    .populate('user', 'username')
                    .then(note =>  {
                        res.json(note)
                    })
            })
            .delete((req, res) => {
                const { id } = req.params;
                Note.findByIdAndRemove(id)
                    .then(note => {
                        if (note === null) {
                            res.status(404).json({
                                    error: `No note with id${id} found. Can't delete it!`
                                });
                            return;
                        }
                        res.json({
                            success: "Note deleted successfully",
                            removedNote: Note
                        });
                    })
                    .catch(err => {
                        res.status(404).json({
                                error: `No note with id${id} found. Can't delete it!`
                            });
                    });
            })
            .put((req, res) => {
                const { id } = req.params;
                const { title, content } = req.body;
                if (!title || !content) {
                    sendError(400, "Must provide title and content to update the note", res);
                    return;
                }
                Note.findByIdAndUpdate(id, { title, content })
                    .then(updatedNote => {
                        if (updatedNote === null) {
                            res
                                .status(404)
                                .json({
                                    error: `No note with id${id} found. Can't update it!`
                                });
                            return;
                        }
                        res.json({
                            success: "Note updated successfully",
                            updatedNote: updatedNote
                        });
                    })  
                    .catch(err => {
                        res
                            .status(500)
                            .json({
                                error: "The note information could not be updated."
                            });
                    });
            });

module.exports = router;
