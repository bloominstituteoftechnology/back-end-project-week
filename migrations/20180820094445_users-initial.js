
exports.up = knex => knex.schema.createTable('users', (users) => {
  users.increments('id');
  users.string('username', 20).unique().notNullable();
  users.string('password').notNullable();
});
exports.down = knex => knex.schema.dropTableIfExists('users');
