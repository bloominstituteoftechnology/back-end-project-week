exports.up = function(knex, Promise) {
	return knex.schema.createTable("posts", tbl => {
		tbl.increments("id");

		tbl
			.integer("user_id")
			.unsigned()
			.references("id")
      .inTable("users")
      .onDelete('CASCADE');

		tbl.string("text").notNullable();

		tbl.timestamp("created_at").defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("posts");
};
