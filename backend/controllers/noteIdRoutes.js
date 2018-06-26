const httpStatus = require('../utils/HTTPStatusCodes');
const { validatePostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (notesModel) => {
  return {
    "GET_ONE_BY_ID": (req, res) => {
      const id = req.params.id;

      notesModel.findById(id)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
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

      if (editedNote.errorState) {
        const { status, error } = editedNote;
        return res.status(status).json({ error });
      }

      const id = req.params.id;
      const configObj = {new:true}; // have result be the updated record, not the original

      notesModel.findByIdAndUpdate(id, editedNote, configObj)
        .then(note => {
          if (!note) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }
          res.status(httpStatus.OK).json(note);
        })
        .catch(error => {
          console.log('noteRoutes--PUT ERROR:',error);
          res.status(500).json(error);
        });
    },
    "DELETE": (req, res) => {
      const idOfNoteToDelete = req.params.id;

      notesModel.findByIdAndRemove(idOfNoteToDelete)
        .then(deletedDoc => {
          if (!deletedDoc) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }
          res.status(httpStatus.OK).json({ deleted: deletedDoc });
        })
        .catch(error => {
          console.log('noteIdRoutes--DELETE ERROR:',error);
          res.status(httpStatus.internalServerError).json({ error: `${httpStatus.internalServerError} Internal Server Error:\n${error}`});
        })
    }
  };
};