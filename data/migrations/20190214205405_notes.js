
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.timestamp('time_posted')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('notes', table => {
    table.dropColumn('time_posted')
  })
};
