// // const express = require('express');
// // const Notes = require('../models/notesModel');
// // const User = require('../models/userModel');

// // //   console.log(req.body, req.params);
// // //   const note = req.body;
// // //   const newNote = new Note(note);
// // //   const { uid } = req.params;

// // //   newNote
// // //     .save()
// // //     .then(savedNote => {
// // //       console.log("saved note: ", savedNote);
// // //       User.findById(uid, (err, user) => {
// // //         if (err)
// // //           return res
// // //             .status(500)
// // //             .json({ msg: "There was an error savkng the note." });
// // //         user.notes.push(savedNote);
// // //         user
// // //           .save()
// // //           .then()
// // //           .catch(err =>
// // //             res.status(500).json({
// // //               msg: "There was an error saving the the note.",
// // //               error: err
// // //             })
// // //           );
// // //       });
// // //       res.status(200).json(savedNote);
// // //     })
// // //     .catch(err => {
// // //       res
// // //         .status(500)
// // //         .json({ msg: "There was an error saving the note.", error: err });
// // //     });
// // // };

// const Note = require('../models/notesModel');
// const User = require('../models/userModel');
// const express = require('express');

// const createNote = (req, res) => {
//   const note = req.body; //Getting from model
//   const newNote = new Note(note);
//   const { userID } = req.params;

//   if (!req.body.content) {
//     return res.status(400).send({ message: 'Content cannot be empty' });
//   }

//   const loggedInUser = await User.findById(userID);

//   // Save Note in the database
//   // newNote
//   //   .save()
//   //   .then(data => {
//   //     res.send(data);
//   //   })
//   //   .catch(err => {
//   //     res.status(500).send({
//   //       message: err.message || 'Some error occurred while creating the Note.'
//   //     });
//     });
// };

// module.exports = { createNote };
