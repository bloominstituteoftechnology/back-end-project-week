
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_table', function(table) {
    table.increments('user_id');
    table.string('username', 12).unique().notNullable();
    table.string('password', 20).notNullable();
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_table');
};
