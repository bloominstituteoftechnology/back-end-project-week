const note = require('./noteModel');

const noteController = {
  getNotes: (req, res) => {
    note
      .find()
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).josn({ errorMessage: 'Unable to populate notes' });
      });
  }
};
