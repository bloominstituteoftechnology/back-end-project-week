exports.up = knex =>
  knex.schema.createTable('users', users => {
    users.increments('id');
    users.text('username').unique();
    users.text('hash');
  });

exports.down = knex => knex.schema.dropTableIfExists('users');
