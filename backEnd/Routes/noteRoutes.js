const express = require('express');
const router = express.Router();
const Note = require('../Models/noteModel.js');
const User = require('../Models/userModel.js');
const session = require('express-session');


function authenticate(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).send('I DONT KNOW YOU!!!');
  }
}

router.get('/', authenticate, (req,res) =>{
  Note.find()
  .then(notes =>
    res.status(200).json(notes))
    .catch(err => {
      res.status(400).json({err: 'Could not getchyer notes'});
    });
  })

router.post('/', authenticate,  (req, res) => {
      Note.create(req.body)
        .then(note => {
          res.status(201).json(note);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: 'Error saving data to the DB', error: err });
        });
    });

router.put('/:id', authenticate,  (req, res) => {
    const { id } = req.params;
    const update = req.body;

    const options = {
      new: true,
    };

    Note.findByIdAndUpdate(id, update, options)
      .then(note => {
        if (note) {
          res.status(200).json(note);
        } else {
          res.status(404).json({ msg: 'Could Not edit Note' });
        }
      })
      .catch(err => res.status(500).json({err: 'Could not edit note'}));
  });

  router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Note.findByIdAndRemove(id)
      .then(note => {
        if (note) {
          res.status(204).end();
        } else {
          res.status(404).json({ msg: 'whaaa? Cant delete' });
        }
      })
      .catch(err => res.status(500).json(err));
  });

  router.get('/:id', authenticate, function get(req, res) {
    const { id } = req.params;

     Note.findById(id)
    .then(note => {
        if (note) {
          res.status(200).json(note);
        } else {
          res.status(404).json({ msg: 'Could Not Find Note' });
        }
      })
      .catch(err => res.status(500).json({err: 'Could not find Note'}));
  });

module.exports = router;