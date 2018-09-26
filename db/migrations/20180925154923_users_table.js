exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
  
      users
        .string('username', 128)
        .notNullable();

      users
      .string('password', 128)
      .notNullable();
    });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
