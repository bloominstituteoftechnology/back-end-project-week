const Note = require('../Models/Note');

const noteEdit = (req, res) => {
  const { title, content } = req.body;
  const author = req.decoded.username;
  Note.findByIdAndUpdate(req.params.id, { title, content })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({ Error: `Unable to edit note: ${err}` });
    });
};

module.exports = noteEdit;
