
exports.up = function(knex, Promise) {
 return knex.schema.createTable('posts',function(table){
table.increments(); //id

table.string('posted_by', 144)
	.references('username')
	.inTable('users')
	.notNullable();

table.string('title', 144)
	.notNullable();

table.string('contents', 3000)
	.notNullable();
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts');
};
