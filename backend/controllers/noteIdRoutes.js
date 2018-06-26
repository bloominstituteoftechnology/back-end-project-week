const httpStatus = require('../utils/HTTPStatusCodes');
const { validatePostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (notesModel) => {
  return {
    "GET_ONE_BY_ID": (req, res) => {
      const id = req.params.id;

      notesModel.findById(id)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ message: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }
          res.status(httpStatus.OK).json(note);
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    },
    "PUT": (req, res) => {
      const editedNote = validatePostBody(req.body);

      if (editedNote.error) {
        const { status, message } = editedNote;
        return res.status(status).json({ message });
      }

      const id = req.params.id;
      const configObj = {new:true}; // have result be the updated record, not the original

      notesModel.findByIdAndUpdate(id, editedNote, configObj)
        .then(note => {
          res.status(httpStatus.OK).json(note);
        })
        .catch(error => {
          console.log('noteRoutes--PUT ERROR:',error);
          res.status(500).json(error);
        });
    },
  };
};