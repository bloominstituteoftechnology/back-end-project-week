exports.up = function(knex, Promise) {
	return knex.schema.createTable("tags", tags => {
		content.increments();
		content.string("tag", 128).noNullable();
		content
			.integer("note_id")
			.unsigned()
			.references("notes.id");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("tags");
};
