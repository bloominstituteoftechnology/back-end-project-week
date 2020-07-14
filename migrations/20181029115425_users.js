
exports.up = function(knex, Promise) {
return knex.schema.createTable('users',function(table) {
table.increments(); //id

table.string('username',144)
	.unique()
	.notNullable();

table.string('password',256)
	.notNullable();
})
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('users');
};
