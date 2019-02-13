
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('name').notNullable();
    users.string('email').notNullable();
    users.string('username').notNullable().unique();
    users.string('role').notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
