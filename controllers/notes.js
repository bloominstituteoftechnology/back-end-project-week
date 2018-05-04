const Note = require("../models/NoteModel");
const User = require("../models/UserModel");

const createNote = async function(req, res) {
  console.log(req.body, req.params);
  const note = req.body;
  const newNote = new Note(note);
  const { uid } = req.params;

  // try {
  //     console.log('userId', uid);
  //     const saveNote = await User.findByIdAndUpdate(uid, {$push: { notes: newNote }})
  //     res.status(201).json(saveNote);
  // } catch(error) {
  //     console.log(error);
  // };
  if (req.params.id) {
    User.findByIdAndUpdate(uid, { $push: { notes: newNote } }, (err, note) => {
      if (err)
        res
          .status(500)
          .json("There was an error adding the note");
    });
    //return;
  }
  newNote
  .save()
  .then(note => {
    console.log( note);
    res.send(note);
  })
  .catch(error => {
    res.status(500).json({
      error: 'There was an error adding the note'
    });
  });
  // newNote
  //   .save()
  //   .then(savedNote => {
  //     console.log("saved note: ", savedNote);
  //     User.findById(uid, (err, user) => {
  //       if (err)
  //         return res
  //           .status(500)
  //           .json({ msg: "There was an error saving the note." });
  //       user.notes.push(savedNote);
  //       user
  //         .save()
  //         .then()
  //         .catch(err =>
  //           res.status(500).json({
  //             msg: "There was an error saving the the note.",
  //             error: err
  //           })
  //         );
  //     });
  //     res.status(200).json(savedNote);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ msg: "There was an error saving the note.", error: err });
  //   });
};

const getNotes = async function(req, res) {
  const { uid } = req.params;
  console.log(uid);
  // Note.find({ uid })
  //   .then(notes => res.json(notes))
  //   .catch(err => res.status(500).json({ error: 'Error fetching notes' }));
  try {
    const loggedInUser = await User.findById(uid).populate("notes");
    //console.log(uid)
    res.status(200).send({ notes: loggedInUser.notes });
  } catch (error) {
    console.log(error, "There was an error retrieving the notes");
  }
};

const deleteNote = async function(req, res) {
  const noteId = req.params.id;
  Note
    .findByIdAndRemove(noteId, req.body)
    .then(deleteNote =>{
    res.json(deleteNote);
    }
  ).catch(error => res.json(error));

  // try {
  //     const removeNote = await User.findByIdAndUpdate(uid, {$pull: {notes: { _id: noteId }}});
  //     res.status(200).send(removeNote.notes);
  // } catch(error) {
  //     console.log(error, 'There was an error deleting the note');
  // };
};

const editNote = async function(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;
  await Note.findByIdAndUpdate(id, req.body, { new: true })
    .then(updateNote => res.status(200).json(updateNote))
    .catch(error => {
      res.status(500).json({ error: "There was an error updating" });
    });
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
  editNote
};
