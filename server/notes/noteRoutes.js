const router = require('express').Router();
const Notes = require('./Notes');

router.get('/', (req, res) => {
	Notes.find()
		.then(notes => {
			res.status(200).json(notes);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});

module.exports = router;
