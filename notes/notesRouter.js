const express = require('express');
const router = express.Router();
const db = require('./notesModel');

// VideoGame endpoints
router.get('/api/', (req, res) => {
  res.status(200).send('Server Listens and Obeys');
});

router.get('/api/notes/all', async (req, res) => {
  // console.log('Why is this not working?');
  try {
    const notes = await db.getAll();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'There was an error while getting the notes. The error is ', error });
  }
});

// router.post('/api/games/', async (req, res) => {
//   const GameData = req.body;
//   console.log(req.body);
//   if (!GameData.title || !GameData.genre) {
//     res.status(422).json({ errorMessage: 'Please provide a title and a genre for your videogame.' });
//   } else if (!db.findByTitle(GameData.title)) {
//     res.status(405).json({ errorMessage: 'Duplicate Game Titles Not Allowed' });
//   } else {
//     try {
//       const newGame = await db.insert(GameData);
//       res.status(201).json(newGame);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ error: 'There was an error while saving the videogame to the database. The error is ', error });
//     }
//   }
// });

module.exports = router;
