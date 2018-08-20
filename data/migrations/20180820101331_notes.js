exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(projects) {
    projects.increments();
    projects.text('title').notNullable();
    projects.text('content');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};