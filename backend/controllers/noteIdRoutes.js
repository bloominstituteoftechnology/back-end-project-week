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
    "PUT": async (req, res) => {
      const userId = req.plainToken._id;
      req.body.author = userId;

      const editedNote = validateNotePostBody(req.body);

      if (editedNote.errorState) {
        const { status, error } = editedNote;
        return res.status(status).json({ error });
      }

      const noteId = req.params.id;
      const configObj = {new:true}; // have result be the updated record, not the original
      
      await notesModel.findById(noteId)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }

          if (note.author != userId) {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
            return;
          }

          notesModel.findByIdAndUpdate(noteId, editedNote, configObj)
            .then(noteB => {
              res.status(httpStatus.OK).json(noteB);
            })
            .catch(error => {
              console.log('noteRoutes--PUT ERROR:',error);
              res.status(500).json(error);
            });

        })
        .catch(error => {
          console.log('noteRoutes--PUT ERROR:',error);
          res.status(500).json(error);
        });

    },
    "DELETE": (req, res) => {
      const idOfNoteToDelete = req.params.id;
      const { _id } = req.plainToken;

      notesModel.findById(idOfNoteToDelete)
        .then(note => {
          if (note === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
            return;
          }

          if (note.author != _id) {
            res.status(httpStatus.unauthorized).json({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
            return;
          }

          note.remove()
            .then(count => {
              if (count < 1) {
                res.status(500).json({ error: "505: Internal Server Error\nThe note could not be removed." });
                return
              }
              res.status(200).json({ "success": "Note successfully deleted." });
            })
            .catch(error => {
              console.log('noteIdRoutes--DELETE ERROR:', error);
              res.status(500).json({ error: "505: Internal Server Error\nThe note could not be removed." });
            });
        })
        .catch(error => {
          console.log('noteIdRoutes--DELETE ERROR:', error);
          res.status(500).json({ error: "505: Internal Server Error\nThe note could not be removed." });
        });

      // notesModel.findByIdAndRemove(idOfNoteToDelete)
      //   .then(deletedDoc => {

      //     if (!deletedDoc) {
      //       res.status(httpStatus.notFound).json({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
      //       return;
      //     }

      //     usersModel.update({ _id: deletedDoc.author }, { $pull: { notes: deletedDoc._id }})
      //       .then(() => {
      //         res.status(httpStatus.OK).json({ deleted: deletedDoc });
      //       })
      //       .catch(error => {
      //         console.log('noteIdRoutes--DELETE ERROR:',error); 
      //         res.status(500).json(error);
      //       });

      //   })
      //   .catch(error => {
      //     console.log('noteIdRoutes--DELETE ERROR:',error);
      //     res.status(500).json(error);
      //     // res.status(httpStatus.internalServerError).json({ error: `${httpStatus.internalServerError} Internal Server Error:\n${error}`});
      //   });
    },
    "SHARE": (req, res) => {
      const { email } = req.body;
      const  idOfNote = req.params.id;

      usersModel.findOne({ email })
        .then(user => {
          
          if (user === null) {
            res.status(httpStatus.notFound).json({ error: "404: Not Found\nNo user with that e-mail was found." });
            return;
          }

          notesModel.update({ _id: idOfNote }, { $push: { collaborators: user._id }})
            .then(() => {
              res.status(httpStatus.OK).json({ "Success" : "Successfully shared note with user. "});
            })
            .catch(error => {
              console.log('noteIdRoutes--SHARE ERROR:',error);
              res.status(500).json(error);
            })
        })
    }
  };
};