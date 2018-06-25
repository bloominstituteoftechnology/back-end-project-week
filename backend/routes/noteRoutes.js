const httpStatus = require('../utils/HTTPStatusCodes');

const validatePostBody = body => {
  const { title, text, tags, author, collaborators } = body;

  if (!author) {
    return { 
      error: true,
      status: httpStatus.badRequest,
      message: "Please let your admin or dev know an error has happened and show them the following:\n400: Bad Request\nThe 'author' field is missing but is required. Ensure it is a MongoDB ObjectID type."
    };
  }

  return {
    title,
    text,
    author,
    tags,
    collaborators
  };
}
module.exports = (notesModel) => {
  return {
    "GET": (req, res) => {
      const query = req.query || {};

      notesModel.find(query)
        .then(notes => {
          res.status(httpStatus.OK).json(notes);
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    },
    "POST": (req, res) => {
      const newNote = validatePostBody(req.body);

      if (newNote.error) {
        return res.status(newNote.status).json({ message: newNote.message });
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
    "PUT": (req, res) => {
      const editedNote = validatePostBody(req.body);

      if (editedNote.error) {
        const { status, message } = editedNote;
        return res.status(status).json({ message });
      }

      const id = req.params.id;
      const configObj = { new: true }; // have result be the updated record, not the original

      notesModel.findByIdAndUpdate(id, editedNote, configObj)
        .then(note => {
          res.status(httpStatus.OK).json(note);
        })
        .catch(error => {
          console.log('noteRoutes--PUT ERROR:',error);
          res.status(500).json(error);
        });
    },
    "NO_PUT": (req, res) => {
      res.status(httpStatus.notFound).json({ message: "404: Not Found\nA valid note ID was not received with the PUT request. Please ensure the URL includes the ID of the note you wish to update." });
    },
  };
};