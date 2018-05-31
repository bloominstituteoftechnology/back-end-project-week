const router = require('express').Router();
const Note = require('../Models/Note');

router.route('/')
  .get((req, res) => {
    Note.find()
      .then(r => {
        res.json(r);
      })
  })
  .post((req, res) => {
    const note = new Note(req.body);
    note.save()
    .then(r => {
      res.status(201).json(r)
    })
    .catch(err => {
      res.status(400).json(err);
    })
  })
router.route('/:id')
  .put((req, res) => {
    const {id} = req.params;
    Note.findByIdAndUpdate(id, req.body, {new: true}, (err, note) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(note);
    })
  })
  .delete((req, res) => {
    const {id} = req.params;
    Note.findByIdAndRemove(id, (err, note) => {
      if(err) return res.status(500).json(err);
      else {
        Note.find()
        .then(r => {
          res.status(200).json(r);
        })
      }
    })
  })

module.exports = router;
