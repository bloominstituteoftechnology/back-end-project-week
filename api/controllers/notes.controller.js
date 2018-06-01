const express = require('express');
const User = require('../models/users.schema');
const Note = require('../models/notes.schema');
const router = express.Router();

const GET = (req, res) => {
	const { username, id } = req.decoded;
	Note.find({ postedBy: id })
		.populate('postedBy', { username: 1, _id: 0 })
		.then(notes => res.status(200).json(notes))
		.catch(err => res.status(500).json({ error: 'error fetching notes' }));
};

const GET_ID = (req, res) => {
	const { id } = req.params;
	Note.findById(id)
		.then(note => res.status(200).json(note))
		.catch(err =>
			res.status(500).json({ message: 'ID is incorrect.  Please try again.' }),
		);
};

const POST = async (req, res) => {
	const { username, id } = req.decoded;
	const user = await User.findById(id);
	const newNote = {
		title: req.body.title,
		content: req.body.content,
		postedBy: id,
	};
	Note.create(newNote)
		.then(note => res.status(201).json(note))
		.catch(err => res.status(500).json({ error: 'error creating new note' }));
};

const PUT = (req, res) => {
	const { id } = req.params;
	Note.findByIdAndUpdate(id, req.body, { new: true })
		.then(updated => res.status(200).json(updated))
		.catch(err =>
			res
				.status(500)
				.json({ error: 'Note can not be updated.  Please try again.' }),
		);
};

const DELETE = (req, res) => {
	const { id } = req.params;
	Note.findByIdAndRemove(id)
		.then(success =>
			res.status(200).json({ message: 'note successfully deleted' }),
		)
		.catch(err =>
			res.status(500).json({ error: 'can not delete note. Please try again.' }),
		);
};

router
	.route('/')
	.get(GET)
	.post(POST);

router
	.route('/:id')
	.get(GET_ID)
	.put(PUT)
	.delete(DELETE);

module.exports = router;
