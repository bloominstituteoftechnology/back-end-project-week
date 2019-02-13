const express = require('express');
const router = express.Router();
const notesHelper = require('../Dbhelpers/noteHelpers');

router.post('/', (req, res) => {
    const note = req.body;
    if (!note.title || !note.textBody) {
        res.status(422)
            .json({ error: "Please provide title and/or textBody information." })
        return
    }
    notesHelper.addNote(note)
        .then(id => {
            res
                .status(201)
                .json(id)
        }).catch(err => {
            console.log(err)
            res
                .status(500)
                .json({ error: "Error adding note to database", err })
        })
})
router.get('/', (req, res) => {
    notesHelper.getNotes()
        .then(notes => {
            res
                .status(200)
                .json(notes);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    notesHelper.getNote(id)
        .then(note => {
            if (note) {
                res
                    .status(200)
                    .json(note);
            } else {
                res
                    .status(404)
                    .json({
                        error: "The note with the specified ID does not exist."
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
})

router.put('/:id', (req, res) => {
    const note = req.body;
    const { id } = req.params;
    console.log()
    if (!note.title || !id || !note.textBody) {
        res.status(404)
            .json({ error: "Please provide title and/or textBody information."  })
        return
    }
    notesHelper.updateNote(id,note)
        .then(id => {
            if (id) {
                res
                    .status(201)
                    .json(id);
            } else {
                res
                    .status(404)
                    .json({ error: "The note with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The note could not be updated", err })
        })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    notesHelper.deleteNote(id)
        .then((count) => {
            if (count) {
                res
                    .status(200)
                    .json(count);
            } else {
                res
                    .status(404)
                    .json({ error: "The bear with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The bear could not be removed" })
        })
});



module.exports = router;