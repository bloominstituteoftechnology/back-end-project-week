const db = require("knex")(require("../../knexfile").development);
const bcrypt = require("bcryptjs");

let SALT_ROUNDS = 8;

module.exports = {
	getNotes() {
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

	addNoteWithTags(note) {
		let { title, textBody, tags } = note;

		return db("notes")
			.insert({ title, textBody })
			.then(id => {
				let noteId = id[0];
				let tagsObjsArr = tags.map(tagEl => ({
					tag: tagEl,
					note_id: noteId,
				}));

				return db("tags")
					.insert(tagsObjsArr)
					.then(ids => {
						return noteId;
					});
			});
	},

	deleteNote(id) {
		return db("notes")
			.where("id", id)
			.del()
			.then(response => {
				return db("tags")
					.where("note_id", id)
					.del();
			});
	},

	updateNote(id, note) {
		let updated = { ...note, id };
		return db("notes")
			.where("id", id)
			.del()
			.then(response => {
				return db("tags")
					.where("note_id", id)
					.del();
			})
			.then(response => {
				return this.addNoteWithTags(updated);
			});
	},

	getUser(id) {
		return db("users").where("id", id);
	},

	addUser(user) {
		user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
		return db("users").insert(user);
	},

	async authenticateUser(username, password, done) {
		let user = await db("users")
			.where("username", username)
			.first();
		if (!user) return done("Invalid info", false);
		if (!bcrypt.compareSync(password, user.password)) {
			return done("Invalid info", false);
		}
		return done(null, user.id);
	},
};
