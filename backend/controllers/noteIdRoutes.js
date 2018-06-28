const httpStatus = require('../utils/HTTPStatusCodes');
const { validateNotePostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (usersModel, notesModel) => {
  return {
    "GET_ONE_BY_ID": (req, res) => {
      const id = req.params.id;
      const { _id } = req.plainToken;
      notesModel.findById(id)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }
          
          if (note.author == _id) {
            res.status(httpStatus.OK).json(note);
          } else {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
          }
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    },
    "PUT": (req, res) => {
      req.body.author = req.plainToken._id;

      const editedNote = validateNotePostBody(req.body);

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

          usersModel.update({ _id: deletedDoc.author }, { $pull: { notes: deletedDoc._id }})
            .then(() => {
              res.status(httpStatus.OK).json({ deleted: deletedDoc });
            })
            .catch(error => {
              console.log('noteRoutes--POST ERROR:',error); 
              res.status(500).json(error);
            });

        })
        .catch(error => {
          console.log('noteIdRoutes--DELETE ERROR:',error);
          res.status(500).json(error);
          // res.status(httpStatus.internalServerError).json({ error: `${httpStatus.internalServerError} Internal Server Error:\n${error}`});
        })
    }
  };
};