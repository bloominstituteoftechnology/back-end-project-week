const userSchema = require('../models/userSchema');

const getNotes = (req, res) => {
  const { id } = req.params;
  userSchema.findById(id)
    .populate('notes')
    .then(cachedNotes => {
      res.send(cachedNotes);
    })
    .catch(err => res.send(err));
};

module.exports = { getNotes, };