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
					.map(tagEl => {
						if (tagEl.note_id === note.id) {
							return tagEl.tag;
						}
					})
					.filter(el => {
						return el !== undefined;
					});
				// console.log({ ...note, tags });
				return { ...note, tags };
			});

			// console.log(notesTags);
			// console.log(notesArr, tagsArr);
			res.json({ error: false, message: notesTags });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: true, message: "Server Error" });
		});
});

module.exports = router;
