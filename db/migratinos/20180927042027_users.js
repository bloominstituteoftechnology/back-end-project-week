exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments();
    tbl.string('first_name', 255);
    tbl.string('last_name', 255);
    tbl.string('email', 255);
    tbl.string('password', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
