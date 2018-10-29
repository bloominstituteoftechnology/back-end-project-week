const express	= require('express');
const noteDb	= require('../data/models/noteDb.js');

const router	= express.Router();

// return list of all notes
router.get('/', (req, res) => {
	return noteDb
		.get()
		.then(notes => res.status(200).json(notes))
		.catch(err => res.status(500).json({ error: `Server could not retrieve notes: ${ err }`}));
});

// insert new note and return that newly inserted note
router.post('/', (req, res) => {
	const note = req.body;
	return noteDb
		.insert(note)
		.then(note => res.status(201).json(note))
		.catch(err => res.status(500).json({ error: `Server could not insert note: ${ err }`}));
});

module.exports = router;
