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
  router
  .route("/:id")
    .put((req, res) => {
      const { id } = req.params
      const update = req.body


    Note
        .findByIdAndUpdate(id, update)
        .then(note => {
          if (note) {
            res.status(200).json(note)
          } else {
            res.status(404).json({ msg: 'Note not found' })
          }
        })
        .catch(err => res.status(500).json(err))
    })


module.exports = router;
