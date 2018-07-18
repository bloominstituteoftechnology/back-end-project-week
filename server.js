const express = require('express');
const morgan = require('morgan');

// const Note = require('./models/Note');

const app = express();

app.use(express.json());
app.use(morgan('combined'));

// app.post('/api/create', (req, res) => {
//     Note.create(req.body)
//         .then(note => {
//             res.status(201).json(note);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ message: 'Error saving note to the DB', error: err });
//         });
// });

app.get('/api/', (req, res) => {
    Note.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'There was a problem getting your notes', error: err });
        });
});

// app.get('/api/view/:id', (req, res) => {
//     Note.find()
//         .then(notes => {
//             res.status(200).json(notes);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ message: 'There was a problem getting your notes', error: err });
//         });
// });

// app.put('/api/edit/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     // All we care about is the game title and id. Don't worry about genre or date.
//     // if (!changes.title || !id) {
//     //   return res.status(422).json({ error: 'Must Provide a title && Id' });
//     // }

//     // const options = {
//     //   new: true,
//     // };

//     Note.findByIdAndUpdate(id, changes, options)
//         .then(note => {
//             if (note) {
//                 res.status(200).json(note);
//             } else {
//                 res.status(404).json({ message: 'Note not found' });
//             }
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .json({ message: 'There was a problem finding that note', error: err });
//         });
// });

// server.delete('/api/games/:id', (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     res.status(422).json({ message: 'You need to give me an ID' });
//   } else {
//     Game.findByIdAndRemove(id)
//       .then(game => {
//         if (game) {
//           res.status(204).end();
//         } else {
//           res.status(404).json({ message: 'Game not found' });
//         }
//       })
//       .catch(err => res.status(500).json(err));
//   }
// });

module.exports = server;