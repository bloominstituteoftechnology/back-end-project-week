const express = require('express')
const router = express.Router()

const noteDB = require('../DB-Functions/Note-Functions')
const note_check = require('../MW-Functions/middleware')


router.get('/', (req, res) => {
 noteDB.pull()
  .then((notes) => {
   res
    .json(notes)
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: "Error pulling notes from DB.", err: err})
  })
})

router.get('/:id', (req, res) => {
 const id = req.params 
 noteDB.pullById(id)
  .then((note) => {
   res
    .json(note)
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: "Error pulling note from DB.", err: err})
  })
})

router.post('/', note_check.note_check, (req, res) => {
 const id = req.params
 const note = req.body
 noteDB.place(id, note)
  .then(() => {
   res
    .status(201)
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: "Error placing note in DB.", err: err})
  })
})

router.put('/:id', note_check.note_check, (req, res) => {
 const id = req.params
 const note = req.body
 noteDB.alter(id, note)
  .then(() => {
   res
    .status(201)
    .json({message: "Successfully altered note in DB.", id: id})
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: "Error altering note in DB.", err: err})
  })
})

router.delete('/:id', (req, res) => {
 const id = req.params
 noteDB.clear(id)
  .then((ids) => {
   res
    .json({message: "Successfully cleared note from DB.",id: id})
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: "Error clearing note from DB.", err: err})
  })
})

module.exports.router