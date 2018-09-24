const express = require("express");
const router = express.Router();
const helpers = require("../db/helpers/index");

router.get("/", function(req, res) {
	helpers
		.getNotes()
		.then(data => {
			let notesArr = data[0];
			let tagsArr = data[1];

			let notesTags = notesArr.map(note => {
				let tags = tagsArr
					.map(tagObj => {
						if (tagObj.note_id === note.id) {
							return tagObj.tag;
						}
					})
					.filter(el => {
						return el !== undefined;
					});
				return { ...note, tags };
			});
			res.json({ error: false, message: notesTags });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: true, message: "Server Error" });
		});
});

router.get("/:id", function(req, res) {
	helpers.getNote(req.params.id).then(data => {
		let note = data[0];
		let tags = data[1].map(tagObj => tagObj.tag);
		let noteTag = { ...note, tags };
		console.log(noteTag);

		res.json({ error: false, message: noteTag });
	});
});

module.exports = router;
