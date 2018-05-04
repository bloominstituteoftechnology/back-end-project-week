const Note = require('../Models/Note');
const User = require('../Models/User');

// GETs all note IDs for a User ID supplied as req.params.id
const noteGet = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    User.findById(id)
      .populate('notes')
      .then(user => {
        res.status(200).json(user.notes);
      })
      .catch(err => {
        res.status(500).json({ Error: `Unable to get notes`, err });
      });
  } else {
    console.log('no id');
  }
};

module.exports = noteGet;
