exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("notes")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("notes").insert([
				{ title: "First Note Title", textBody: "First note body" },
				{ title: "Second Note Title", textBody: "Second note body" },
				{ title: "Third Note Title", textBody: "Third note body" },
			]);
		});
};
