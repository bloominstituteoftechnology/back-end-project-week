const Note = require('../models/noteModel');

const modifyNote = (req, res) => {
  const { _id, title, content } = req.body;
  const author = req.decoded.id;
  Note.findByIdAndUpdate(_id, { title, content }, { new: true } )
    .then(note => {
      if (note === null) {
        res.status(422).json({ message: 'Note by that Id was not found.'});
        return;
      }
      if (note.author.toString() !== author) {
        // console.log(typeof author,author, 'vs', typeof note.author, note.author);
        res.status(422).json({ message: 'Wrong Author.'});
        return;
      }
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(422).json({ message: 'Could not modify note', err });
    });
};

module.exports = modifyNote;
