const express = require("express");
const router = express.Router();

const Note = require("./Note");

router.route("/").get((req, res) => {
	const query = Note.find();

	query
		.then(notes => {
			res.status(200).json(notes);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "Notes could not be retrieved" });
		});
});

router.route("/").post((req, res) => {
	if (!req.body.title || !req.body.content) {
		res
			.status(400)
			.json({ errorMessage: "Please provide a title and text for the note" });
	} else {
		const newNote = new Note(req.body);

		newNote
			.save()
			.then(newNote => {
				res.status(201).json(newNote);
			})
			.catch(err => {
				res.status(500).json({
					errorMessage: "There was an error saving the note to the database"
				});
			});
	}
});

module.exports = router;
