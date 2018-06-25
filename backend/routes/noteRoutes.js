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
    }
  };
};