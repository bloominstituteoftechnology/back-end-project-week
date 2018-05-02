const Note = require('../Models/Note');

const noteGet = (req, res) => {
  const author = req.body.username;
  Notes.find({ author })
    .then(userNotes => {
      if (userNotes === null) {
        res.status(200).json({ Message: 'User has no notes!' });
      } else {
        res.status(200).json(userNotes);
      }
    })
    .catch(err => {
      res.status(500).json({ Error: `Unable to get notes: ${err}` });
    });
};

module.exports = noteGet;
