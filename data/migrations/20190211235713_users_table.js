
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments('id')
    users.string('name').notNullable();
    users.string('email').notNullable();
    users.string('username').notNullable();
    users.string('password').notNullable();
    users.string('role').notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
