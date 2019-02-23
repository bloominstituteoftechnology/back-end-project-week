
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments().primary();
    posts.string('title').notNullable();
    posts.string('details');
    posts.string('username').notNullable();
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts'); 
};


