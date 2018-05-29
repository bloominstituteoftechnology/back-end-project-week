const router = require('express').Router()
const Note = require('../Models/NoteModels')

router
  .route("/")
  .get((req, res)=>{
    Note
    .find()
    .then((note)=> {
      res.status(200).json(note)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  })
  .post((req, res) => {
    const note = new Note(req.body)

    note
      .save()
      .then(() => {
        res.status(201).json(Budget)
      })
      .catch((err) => {
        res.status(500).json(err)
    })
  })
module.exports = router;
