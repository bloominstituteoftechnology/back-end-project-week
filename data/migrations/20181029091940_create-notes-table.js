exports.up = function(knex, Promise) {
	return knex.schema.createTable('notes', function(table) {
		table.increments();

		table
			.string('title', 64)
			.notNullable();

		table
			.string('content', 255)
			.notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('notes');
};
