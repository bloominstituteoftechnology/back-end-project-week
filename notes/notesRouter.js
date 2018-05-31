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

router.route("/:id").get((req, res) => {
	const { id } = req.params;
	const query = Note.findById(id);

	query
		.then(note => {
			if (!note) {
				res.status(404).json({ message: "Note does not exist" });
			}
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "Note could not be retrieved" });
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

router.route("/:id").delete((req, res) => {
	const { id } = req.params;
	const query = Note.findByIdAndRemove(id)
		.then(note => {
			if (!note) {
				res.status(400).json({ message: "Note does not exist" });
			}
			res.status(204).json(note);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: "The note could not be removed" });
		});
});

module.exports = router;
