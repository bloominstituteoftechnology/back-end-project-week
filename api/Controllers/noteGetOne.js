const Note = require('../Models/Note');

const noteGetOne = (req, res) => {
  // return the title and contents of the note id supplied
  if (req.params.id) {
    Note.findById(req.params.id)
      .then(note => {
        console.log(note);
        res.status(200).json({ title: note.title, content: note.content });
      })
      .catch(err => {
        res.status(500).json({
          Error: `Unable to get note with Id of: ${req.params.id}`,
          err,
        });
      });
  } else {
    console.log('no id');
  }
};

module.exports = noteGetOne;
