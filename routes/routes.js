const express = require('express'); // bring in express
const Note = require('../notes/notes'); // bring in our Note

const router = express.Router();

router 
.get('/', (req, res) => {
    Note
    .find()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

module.exports = router;



