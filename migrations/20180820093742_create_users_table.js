
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
  	tbl.increments();
  	tbl
  		.string('name')
  		.notNullable()
  		.unique();
  	tbl
  		.string('password', 10)
  		.notNullable();
		tbl
  		.string('email')
  		.notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
