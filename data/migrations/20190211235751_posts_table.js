
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments();
    posts.string('title').notNullable();
    posts.string('dateCreated').notNullable();
    posts.string('lastModified');
    posts.string('dueDate');
    posts.string('category');
    posts.string('userId').notNullable().references('id').inTable('users')
    posts.boolean('completed');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts'); 
};


