const mongoose = require('mongoose');

const config = require('../api/config.js');
const Note = require('./noteModel');
const User = require('../users/userModel');

const errHandler = (res, err, msg = 'error occurred') => {
  if (config.env === 'development') {
    return res.status(500).json(err);
  } else {
    return res.status(500).json({
      errorMessage: msg,
    });
  }
};

// only special users
const getNotes = (req, res) => {
  Note.find({})
    .then(notes => {
      if (notes) {
        res.status(200).json(notes);
      } else {
        res.status(404).json({ errorMessage: 'Can not find any notes!' });
      }
    })
    .catch(err =>
      errHandler(res, err, 'Encountered an error problem when finding notes!')
    );
};

const getUserNotes = (req, res) => {
  User.findById(req.params.id)
    .select('notes -_id firstname lastname')
    .populate('notes')
    .then(userNotes => {
      if (userNotes) {
        res.status(200).json(userNotes);
      } else {
        res
          .status(404)
          .json({ errorMessage: "Can not find that user's notes!" });
      }
    })
    .catch(err =>
      errHandler(
        res,
        err,
        "Encountered an error problem when finding the user's notes!"
      )
    );
};

const updateUserNotes = (userId, userNotes) => {
  User.findByIdAndUpdate(userId, { notes: userNotes })
    .then(user => {})
    .catch(err =>
      errHandler(
        res,
        err,
        'error occurred when trying to add a note to the user'
      )
    );
};

const createNote = (req, res) => {
  const { title, content } = req.body;

  if (title === undefined || content === undefined) {
    return res
      .status(400)
      .json({ errorMessage: ' title and content are required' });
  }

  User.findById(req.params.id)
    .select('notes -_id firstname lastname')
    .then(user => {
      if (user) {
        const note = new Note(req.body);
        const userNotes = user.notes;
        // add note id user notes
        userNotes.push(note._id);

        // update the user notes
        updateUserNotes(req.params.id, userNotes);

        note
          .save()
          .then(newNote => {
            // do a find
            User.findById(req.params.id)
              .select('-_id firstname lastname notes')
              .populate('notes')
              .then(updatedUserNotes => {
                res.status(201).json(updatedUserNotes);
              })
              .catch(err => errHandler(res, err));
          })
          .catch(err =>
            errHandler(res, err, 'Encountered a post error problem!')
          );
      } else {
        res.status(404).json({ errorMessage: 'Can not find that user!' });
      }
    })
    .catch(err =>
      errHandler(
        res,
        err,
        "Encountered an error problem when creating the user's note!"
      )
    );
};

const getNoteById = (req, res) => {
  const { id, note_Id } = req.params;

  User.findById(id)
    .select(' -_id firstname lastname')
    .then(filterUser => {
      if (filterUser) {
        Note.findById(note_Id)
          .then(foundNote => {
            if (foundNote) {
              const result = {
                note: foundNote,
                firstname: filterUser.firstname,
                lastname: filterUser.lastname,
              };
              res.status(200).json(result);
            } else {
              res
                .status(404)
                .json({ errorMessage: "Can not find that user's note!" });
            }
          })
          .catch(err =>
            errHandler(
              res,
              err,
              'Encountered an error problem when finding the note!'
            )
          );
      } else {
        res.status(404).json({ errorMessage: 'Can not find that user!' });
      }
    })
    .catch(err =>
      errHandler(res, err, 'Encountered an error problem when finding the user')
    );
};

const updateNoteById = (req, res) => {
  const { id, note_Id } = req.params;

  // destructor tags to update with put

  User.findById(id)
    .select(' -_id firstname lastname')
    .then(filterUser => {
      if (filterUser) {
        Note.findByIdAndUpdate(note_Id, req.body)
          .then(noteUpdated => {
            if (noteUpdated === null) {
              res.status(422).json({ error: 'Note could not be updated!' });
            } else {
              Note.findById(noteUpdated._id)
                .then(updatedNote => {
                  const result = {
                    note: updatedNote,
                    firstname: filterUser.firstname,
                    lastname: filterUser.lastname,
                  };
                  res.status(200).json(result);
                })
                .catch(err =>
                  errHandler(
                    res,
                    err,
                    'Encountered an error problem when updating the note!'
                  )
                );
            }
          })
          .catch(err =>
            errHandler(
              res,
              err,
              'Encountered an error problem when finding the note!'
            )
          );
      } else {
        res.status(404).json({ errorMessage: 'Can not find that user!' });
      }
    })
    .catch(err =>
      errHandler(res, err, 'Encountered an error problem when finding the user')
    );
};

const deleteNoteById = (req, res) => {
  const { id, note_Id } = req.params;

  User.findById(id)
    .then(user => {
      if (user) {
        Note.findByIdAndRemove(note_Id)
          .then(deletedNote => {
            if (deletedNote) {
              res.status(200).json(deletedNote);
            } else {
              res
                .status(404)
                .json({ errorMessage: 'Can not delete that note!' });
            }
          })
          .catch(err => errHandler(res, err, 'cannot delete that note'));
      } else {
        res
          .status(404)
          .json({ errorMessage: 'Can not delete an error occured' });
      }
    })
    .catch(err =>
      errHandler(
        res,
        err,
        "Encountered an error problem when deleting the user's note!"
      )
    );
};

module.exports = {
  getNotes,
  getUserNotes,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
