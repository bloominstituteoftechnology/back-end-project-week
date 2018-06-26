const httpStatus = require('../utils/HTTPStatusCodes');
const { validateNotePostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (notesModel) => {
  return {
    "GET": (req, res) => {
      const { _id } = req.plainToken;
      console.log('plainToken:',req.plainToken);
      notesModel.find({ author: _id })
        .then(notes => {
          res.status(httpStatus.OK).json(notes);
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    },
    "POST": (req, res) => {
      const newNote = validateNotePostBody(req.body);

      if (newNote.errorState) {
        const { status, error } = newNote;
        return res.status(status).json({ error });
      }
      notesModel.create(newNote)
        .then(note => {
          res.status(httpStatus.created).json(note);
        })
        .catch(error => {
          console.log('noteRoutes--POST ERROR:',error);
          res.status(500).json(error);
        });
    },
    "NO_PUT": (req, res) => {
      res.status(httpStatus.notFound).json({ error: "404: Not Found\nA valid note ID was not received with the PUT request. Please ensure the URL includes the ID of the note you wish to update." });
    },
  };
};