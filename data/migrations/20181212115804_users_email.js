exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    // user_id
    table
      .string('email', 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('email');
  });
};
