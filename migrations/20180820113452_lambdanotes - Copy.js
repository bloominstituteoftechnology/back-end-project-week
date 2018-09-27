
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function (table){
    table.increments();
    table.string('title').notNullable().unique();
    table.string('content');
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('notes')
};
