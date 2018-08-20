exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts_tags', table => {
		table.increments();
		table.integer('postId').unsigned().references('id').inTable('posts');
		table.integer('tagId').unsigned().references('id').inTable('tags');
	})  
};
 exports.down = function(knex, Promise) {
 	return knex.schema.dropTableIfExists('posts_tags');
};
