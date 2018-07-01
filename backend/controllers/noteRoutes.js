const httpStatus = require('../utils/HTTPStatusCodes');
const { validateNotePostBody } = require('../utils/controllers/controllerHelpers');

module.exports = (usersModel, notesModel) => {
  return {
    // "GET": (req, res) => {
    //   // console.log('plainToken:',req.plainToken);
    //   const { _id } = req.plainToken;
    //   notesModel.find({ author: _id })
    //     .sort({ dateCreated: 'descending' })
    //     .then(notes => {
    //       res.status(httpStatus.OK).json(notes);
    //     })
    //     .catch(error => {
    //       console.log('noteRoutes--GET ERROR:',error);
    //       res.status(500).json(error);
    //     });
    // },
    "GET": (req, res) => {
      // console.log('plainToken:',req.plainToken);
      const { _id } = req.plainToken;
      notesModel.find({ $or: [{ author: _id }, { collaborators: _id }]})
        .populate('collaborators','email')
        .sort({ dateCreated: 'descending' })
        .then(notes => {
          res.status(httpStatus.OK).json(notes);
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    },
    "POST": (req, res) => {
      req.body.author = req.plainToken._id;

      const newNote = validateNotePostBody(req.body);

      if (newNote.errorState) {
        const { status, error } = newNote;
        return res.status(status).json({ error });
      }
      notesModel.create(newNote)
        .then(note => {
          usersModel.update({ _id: note.author }, { $push: { notes: note._id }})
            .then(() => {
              res.status(httpStatus.created).json(note);
            })
            .catch(error => {
              console.log('noteRoutes--POST ERROR:',error); 
              res.status(500).json(error);
            });
        })
        .catch(error => {
          console.log('noteRoutes--POST ERROR:',error); 
          res.status(500).json(error);
        });
    },
    "NO_PUT": (req, res) => {
      res.status(httpStatus.notFound).json({ error: "404: Not Found\nA valid note ID was not received with the PUT request. Please ensure the URL includes the ID of the note you wish to update." });
    },
    "SEARCH": (req, res) => {
      const userId = req.plainToken._id;
      const { terms } = req.query;
      console.log('terms:',terms);
      // thanks to https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
      notesModel
        .find({ $text: { $search: terms }, author: userId }, { score: { $meta: 'textScore' }})
        .sort({ score: { $meta: 'textScore' }})
        .then(notes => {
          res.status(httpStatus.OK).json(notes);
        })
        .catch(error => {
          console.log('noteRoutes--GET ERROR:',error);
          res.status(500).json(error);
        });
    }
  };
};