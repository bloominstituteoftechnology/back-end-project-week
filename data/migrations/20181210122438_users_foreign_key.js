exports.up = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    // user_id
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.dropColumn('user_id');
  });
};
