
exports.up = knex => knex.schema.createTable('users', (users) => {
  users.increments('id');
  users.string('username').unique().notNullable();
  users.string('password').notNullable();
  users.boolean('admin').notNullable().defaultTo(false);
  users.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
});

exports.down = knex => knex.schema.dropTableIfExists('users');
