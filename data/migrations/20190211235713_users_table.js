
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('name');
    users.string('email');
    users.string('username');
    users.string('password');
    users.string('role');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
