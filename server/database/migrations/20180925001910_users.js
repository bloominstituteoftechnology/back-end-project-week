
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    // id
    table.increments('userId')
    // username - cannot be empty and only one
    table.string('username', 50).notNullable().unique()
    // password - cannot be empty
    table.string('password', 128).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
