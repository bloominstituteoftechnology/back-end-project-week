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
					.filter(tag => tag.note_id === note.id)
					.map(tagObj => {
						return tagObj.tag;
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

// router.get("/:id", function(req, res) {
// 	helpers
// 		.getNote(req.params.id)
// 		.then(data => {
// 			console.log(data);
// 			if (!data[0]) {
// 				return res.json({
// 					error: true,
// 					message: "No Note by that ID",
// 				});
// 			}
// 			let note = data[0];
// 			let tags = data[1].map(tagObj => tagObj.tag);
// 			let noteTag = { ...note, tags };

// 			res.json({ error: false, message: noteTag });
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ error: true, message: "Server Error" });
// 		});
// });

router.post("/", function(req, res) {
	helpers
		.addNoteWithTags(req.body)
		.then(noteId => {
			return res.json({
				error: false,
				message: noteId,
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: true, message: "Server Error" });
		});
});

router.delete("/:id", function(req, res) {
	helpers
		.deleteNote(req.params.id)
		.then(response => {
			return res.json({
				error: false,
				message: response,
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: true, message: "Server Error" });
		});
});

router.put("/:id", function(req, res) {
	helpers
		.updateNote(req.params.id, req.body)
		.then(response => {
			console.log(response);
			return res.json({
				error: false,
				message: "sup",
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: true, message: "Server Error" });
		});
});

module.exports = router;
