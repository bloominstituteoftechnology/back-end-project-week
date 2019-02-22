
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments().primary();
    posts.string('title').notNullable();
    posts.string('details');
    posts.string('dateCreated');
    posts.string('category');
    posts.string('userId');
    posts.string('username');
    posts.boolean('completed');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts'); 
};


