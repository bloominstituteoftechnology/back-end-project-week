
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.timestamp('time_updated', true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.dropColumn('time_updated')
  })
};
