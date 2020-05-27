const express = require('express');
const db = require('./flashcards-model');
const router = express.Router();


// GET a list of flashcards
router.get('/', (req, res) => {
	db
		.find()
		.then((flashcards) => res.status(200).json(flashcards))
		.catch((error) => res.status(500).json({ message: 'Could not get flashcards from server.' }));
});

// GET a flashcard by ID
router.get('/:id', (req, res) => {
	db
		.findByID(req.params.id)
		.then((flashcard) => res.status(200).json(flashcard))
		.catch((error) => res.status(500).json({ message: 'Could not get flashcard #' + req.params.id + ' from server.' }));
});

// POST a flashcard to the database
router.post('/', (req, res) => {
    db.findBy({ name: req.body.name })
      .then(foundUser => {
        if (foundUser.length === 0) {
          db.add(req.body)
            .then(newFlashcard => {
              res.status(201).json(newFlashcard[0]);
            })
            .catch(err => res.status(500).json(err));
        } else {
          res.status(400).json({
            message: `The Flashcard Name: ${req.body.name}, is already taken.`,
          });
        }
      })
      .catch(err => res.status(500).json(err));
  })

  router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
      .then(updatedFlashcard => res.status(200).json(updatedFlashcard))
      .catch(err => res.status(500).json(err));
  })

  router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
      .then(count => res.json(count))
      .catch(err => res.status(500).json(err));
  })

  
module.exports = router;