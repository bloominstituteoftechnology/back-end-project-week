
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(t){
    t.increments();
    t
    .string('title')
    .notNullable()
    t
    .string('body')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
};
