
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_table', function(table) {
    table.increments('user_id');
    table.string('username', 36).unique().notNullable();
    table.string('password', 25).notNullable();
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_table');
};
