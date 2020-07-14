
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments('userId');

    users.string('username', 128).notNullable().unique();
    users.string('email', 128).unique();
    users.string('password', 128).notNullable();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
