
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments();
      table.string(name, 50).notNullable();
      table.string(email).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
