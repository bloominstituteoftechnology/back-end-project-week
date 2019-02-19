
exports.up = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').on('users')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('notes', table => {
    table.dropColumn('user_id')
  })
};
