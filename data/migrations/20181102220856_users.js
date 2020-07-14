exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 30)
      .notNullable()
      .unique();
    
    users
      .string('password', 30)
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};