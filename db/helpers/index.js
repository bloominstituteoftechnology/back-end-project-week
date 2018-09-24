const db = require("knex")(require("../../knexfile").development);

module.exports = {
	getNotes() {
		// let notes = db("notes")
		// 	.join("tags", "tags.note_id", "notes.id")
		// 	.select(
		// 		"notes.id",
		// 		"notes.title",
		// 		"notes.textBody",
		// 		"tags.tag",
		// 		"tags.note_id",
		// 	);

		// return notes;
		let notes = db("notes");
		let tags = db("tags");
		return Promise.all([notes, tags]).then(results => {
			return results;
		});
	},

	getNote(id) {
		let note = db("notes")
			.where("id", id)
			.first();
		let tags = db("tags").where("note_id", id);
		return Promise.all([note, tags]).then(results => {
			return results;
		});
	},
};
