
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
        tbl
            .increments()
            .unique();
        tbl
            .string('email', 128)
            .unique()
            .notNullable();
        tbl
            .string('password', 128)
            .unique()
            .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
