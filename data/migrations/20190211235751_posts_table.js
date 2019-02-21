
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments();
    posts.string('title').notNullable();
    posts.string('details');
    posts.string('dateCreated');
    posts.string('lastModified');
    posts.string('dueDate');
    posts.string('category');
    posts.string('userId').references('id').inTable('users')
    posts.string('username').references('username').inTable('users')
    posts.boolean('completed');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts'); 
};


