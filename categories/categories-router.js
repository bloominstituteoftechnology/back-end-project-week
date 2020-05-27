const express = require('express');
const db = require('./categories-model');
const router = express.Router();

// GET a list of categories
router.get('/', (req, res) => {
	db
		.find()
		.then((categories) => res.status(200).json(categories))
		.catch((error) => res.status(500).json({ message: 'Could not get categories from server.' }));
});

// GET a category by ID
router.get('/:id', (req, res) => {
	db
		.findByID(req.params.id)
		.then((category) => res.status(200).json(category))
		.catch((error) =>
			res.status(500).json({ message: 'Could not get category #' + req.params.id + ' from server.' })
		);
});

// GET flashcards in a category by ID
router.get('/:id/flashcards', (req, res) => {
	db
		.findFlashcardsByCategoryID(req.params.id)
		.then((category) => res.status(200).json(category))
		.catch((error) =>
			res.status(500).json({ message: 'Could not get category #' + req.params.id + ' from server.' })
		);
});

// POST a category to the database
router.post('/', (req, res) => {
	db
		.findBy({ name: req.body.name })
		.then((foundCategory) => {
			if (foundCategory.length === 0) {
				db
					.add(req.body)
					.then((newCategory) => res.status(201).json(newCategory))
					.catch((err) => res.status(500).json(err, 'hit this'));
			} else {
				res.status(400).json({
					message: `The Category Name: ${req.body.name}, is already taken.`
				});
			}
		})
		.catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
	db
		.update(req.params.id, req.body)
		.then((updatedCategory) => res.status(200).json(updatedCategory))
		.catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
	db.remove(req.params.id).then((id) => res.status(200).json(id)).catch((err) => res.status(500).json(err));
});

module.exports = router;
