
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.dropColumn('time_updated')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};
