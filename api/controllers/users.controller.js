const express = require('express');
const router = express.Router();
const User = require('../models/users.schema');

const GET = (req, res) => {
	User.find()
		.then(users => {
			users.length === 0
				? res.status(204).json({ message: 'no users in the database' })
				: res.status(200).json(users);
		})
		.catch(err => res.status(500).json({ error: 'server unavailable' }));
};

const GET_ID = (req, res) => {
	const { id } = req.params;
	User.findById(id)
		.then(user => res.status(200).json(user))
		.catch(err =>
			res.status(500).json({ message: 'ID is incorrect.  Please try again.' }),
		);
};

const POST = (req, res) => {
	User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(err => res.status(500).json({ error: 'user cannot be created.' }));
};

const PUT = (req, res) => {
	const { id } = req.params;
	const updates = req.body;
	User.findByIdAndUpdate(id, updates, { new: true })
		.then(updated => res.status(200).json(updated))
		.catch(err =>
			res
				.status(500)
				.json({ error: 'user can not be updated. Please try again' }),
		);
};

const DELETE = (req, res) => {
	const { id } = req.params;
	User.findByIdAndRemove(id)
		.then(deleted =>
			res.status(200).json({ success: 'user  deleted successfully' }),
		)
		.catch(err => res.status(500).json({ error: 'can not delete this user' }));
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
