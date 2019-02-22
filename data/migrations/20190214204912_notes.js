
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.dropColumn('time_posted')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.dropColumn('time_posted')
  })
};
