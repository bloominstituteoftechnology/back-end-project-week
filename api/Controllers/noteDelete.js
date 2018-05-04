const Note = require('../Models/Note');

const noteDelete = (req, res) => {
  Note.findByIdAndRemove(req.params.id)
    .then(resposne => {
      res.status(200).json({ Message: `Note successfully deleted!` });
    })
    .catch(err => {
      res.status(500).json({ Error: `Unable to delete note`, err });
    });
};

module.exports = noteDelete;
