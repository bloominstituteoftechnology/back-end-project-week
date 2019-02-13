
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments();
    posts.string('title').notNullable();
    posts.string('dateCreated').notNullable();
    posts.string('lastModified').string();
    posts.string('dueDate');
    posts.string('category');
    posts.string('owner').notNullable().references('username').inTable('users')
    posts.boolean('completed');
    posts.boolean('private');
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('posts'); 
};
