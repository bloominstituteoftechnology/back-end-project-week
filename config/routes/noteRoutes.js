const express = require('express');
const router = express.Router();
const db = require('../../database/dbConfig');

router.get('/', (req, res, next) => {
	db('notes')
		.then(data => {
			res.status(200).json(data);
		})
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	db('notes')
		.where({ id: req.params.id })
		.first()
		.then(note => {
			if (!note) return next({ code: 404 });
			res.status(200).json(note);
		})
		.catch(next);
});

router.post('/', (req, res, next) => {
	let { title, content } = req.body;
	if (!title || !content) return next({ code: 400 });
	db('notes')
		.insert({ title, content })
		.then(data => {
			res.status(200).json({
				error: false,
				message: 'Post successful',
			});
		})
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	let { title, content, index } = req.body;
	if (!title && !content && !index) return next({ code: 400 });
	if (!index) {
		db('notes')
			.where({ id: req.params.id })
			.update({ title, content })
			.then(response => {
				if (!response) return next({ code: 404 });
				res.status(200).json({
					error: false,
					message: 'Update successful',
				});
			})
			.catch(next);
	}
	let id = index + 1;
	db('notes').where('id', '>', index).increment('id', 1).then(response => console.log(response));
});

router.delete('/:id', (req, res, next) => {
	db('notes')
		.where({ id: req.params.id })
		.del()
		.then(response => {
			if (!response) return next({ code: 404 });
			res.status(200).json({
				error: false,
				message: 'Delete successful',
			});
		})
		.catch(next);
});

module.exports = router;
