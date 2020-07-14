const express = require('express');

const router = express.Router();
const User = require('../Models/userModel.js');


router.post('/', (req, res) => {
    User.create(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'Error saving data to the DB', error: err });
      });
  });

  router.get('/', (req,res) =>{
    User.find()
    .then(users =>
    res.status(200).json(users))
    .catch(err => {
        res.status(400).json({err: 'Could not find Users'});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    const options = {
      new: true,
    };

    User.findByIdAndRemove(id, update, options)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ msg: 'Could Not Delete User' });
        }
      })
      .catch(err => res.status(500).json({err: 'Could not delete User'}));
  });

  router.get('/:id', function get(req, res) {
    const { id } = req.params;

     User.findById(id)
    .populate('notes', 'title content -_id' )
    .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ msg: 'Could Not Find User' });
        }
      })
      .catch(err => res.status(500).json({err: 'Could not find User'}));
  });

  module.exports = router;