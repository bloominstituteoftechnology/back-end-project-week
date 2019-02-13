const express = require('express');
const router = express.Router();
const db = require('../helpers/notesModel');

router.get('/api/notes', (req,res) => {
       db.getNotes()
         .then(notes => {
           res.status(200).json(notes)
         })
         .catch(err => {
           res.status(500).json({msg:`Failed get the notes`});
         })
});









module.exports = router;
