const express	= require('express');
const noteDb	= require('../data/models/noteDb.js');

const router	= express.Router();

// return list of all notes
router.get('/', (req, res) => {
	return noteDb
		.get()
		.then(notes => {
			if (!notes.length) return res.status(404).json({ error: 'No notes in database.' });
			return res.status(200).json(notes);
		})
		.catch(err => res.status(500).json({ error: `Server could not get notes: ${ err }`}));
});

// return a note with given id
router.get('/:id', (req, res) => {
	const { id } = req.params;
	return noteDb
		.get(id)
		.then(note => {
			if (!note.length) {
				return res.status(404).json({ error: `Note with id ${ id } does not exist.` });
			}
			return res.status(200).json(note);
		})
		.catch(err => res.status(500).json({ error: `Server could not get note: ${ err }`}));
});

// insert new note and return that newly inserted note
router.post('/', (req, res) => {
	const note = req.body;
	return noteDb
		.insert(note)
		.then(note => res.status(201).json(note))
		.catch(err => res.status(500).json({ error: `Server could not insert note: ${ err }`}));
});

// update an existing note with given id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const note = req.body;
	return noteDb
		.update(id, note)
		.then(putBool => {
			if (putBool) return res.status(200).json(`Note with id ${ id } was updated successfully.`);
			return res.status(404).json(`Note with id ${ id } does not exist.`);
		})
		.catch(err => res.status(500).json({ error: `Server could not update note: ${ err }`}));
});

// remove an existing note
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	return noteDb
		.remove(id)
		.then(del => {
			if (del) return res.status(200).json(`Note with id ${ id } was deleted successfully.`);
			return res.status(404).json(`Note with id ${ id } does not exist.`);
		})
		.catch(err => res.status(500).json({ error: `Server could not delete note: ${ err }`}));
});

module.exports = router;
