const userSchema = require('../models/userSchema');

const getNotes = (req, res) => {
  const { _id } = req.params;
  userSchema.findById(_id)
    .populate('notes')
    .then(cachedNotes => {
      res.send(cachedNotes);
    })
    .catch(err => res.send(err));
};

module.exports = { getNotes, };