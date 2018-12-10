exports.up = function(knex, Promise) {
	return knex.schema.createTable('notes', (tbl) => {
		tbl.increments();
		tbl.string('title', 30).notNullable();
		tbl.text('content').notNullable();
		tbl.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('notes');
};
