exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    // username
    table
      .string('username', 255)
      .notNullable()
      .unique();
    // password
    table.string('password', 255).notNullable();
    // Timestamp created_at updated_at
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
