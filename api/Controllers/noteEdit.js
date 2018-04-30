const Note = require('../Models/Note');

const noteEdit = (req, res) => {
  const { _id, title, content } = req.body;
  const author = req.decoded.username;
  Note.findByIdAndUpdate(_id, { title, content })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ Error: `Unable to edit note: ${err}` });
    });
};

module.exports = noteEdit;
