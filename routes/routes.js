const express = require('express');
const router = express.Router();
const Note = require('./notes/notes');

router.get('/', (req, res) => {
  Note
		.find()
		.then(notes => {
			res.status(202).json(notes);
		})
		.catch(err => {
			res.status(500).json({msg: "Try again"});
		});
})

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Note
		.findById(id)
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(500).json({msg: "Try again"});
		});
})

router.post('/', (req, res) => {
	const note = new Note(req.body);
  note
		.save()
		.then(newNote => {
			res.status(201).json(newNote);
		})
		.catch(err => {
			res.status(500).json({msg: "Try again"});
		});
})
