const express = require('express');
const Notes = require('../models/notesModel');
const User = require('../models/userModel');

// console.log(req.body, req.params);
//   const note = req.body;
//   const newNote = new Note(note);
//   const { uid } = req.params;

//   // try {
//   //     console.log('userId', uid);
//   //     const saveNote = await User.findByIdAndUpdate(uid, {$push: { notes: newNote }})
//   //     res.status(201).json(saveNote);
//   // } catch(error) {
//   //     console.log(error);
//   // };
//   if (req.params.id) {
//     User.findByIdAndUpdate(uid, { $push: { notes: newNote } }, (err, note) => {
//       if (err)
//         res
//           .status(500)
//           .json("There was an error adding the note");
//     });
//     return;
//   }
//   newNote
//     .save()
//     .then(savedNote => {
//       console.log("saved note: ", savedNote);
//       User.findById(uid, (err, user) => {
//         if (err)
//           return res
//             .status(500)
//             .json({ msg: "There was an error savkng the note." });
//         user.notes.push(savedNote);
//         user
//           .save()
//           .then()
//           .catch(err =>
//             res.status(500).json({
//               msg: "There was an error saving the the note.",
//               error: err
//             })
//           );
//       });
//       res.status(200).json(savedNote);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ msg: "There was an error saving the note.", error: err });
//     });
// };

const createNote = (req, res) => {
  const note = req.body;
  const newNote = new Notes(note);

  const { userID } = req.params;

  newNote
    .save()
    .then()
    .catch(error => {
      console.log('error');
    });
};
