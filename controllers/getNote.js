const userSchema = require('../models/userSchema');

const getNote = (req, res) => {
  const { id } = req.params;
  userSchema.findById(id)
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ msg: 'No such note', error: err });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error', error: err });
    });
  };

  module.exports = { getNote, };