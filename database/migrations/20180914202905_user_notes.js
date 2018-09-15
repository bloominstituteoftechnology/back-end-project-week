exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_notes', table => {
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users');
    table
      .integer('note_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('notes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_notes');
};
