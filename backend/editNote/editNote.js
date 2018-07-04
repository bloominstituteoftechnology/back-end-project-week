const express = require('express');
const router = express.Router();

const Notes = require('../notesModel/notesModel.js');


router
    .route('/:id')
    .put((req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
        Notes
            .findByIdAndUpdate(id, { title, content })
            .then(updatedNote => {
                res.status(201).json({ updatedNote })
            })
            .catch(err => {
                conole.log(err)
                res.status(500).json({ errorMessage: err })
            })
    })

module.exports = router;