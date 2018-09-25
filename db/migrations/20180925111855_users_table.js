
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl){
      tbl.increments();
      tbl.string('firstname');
      tbl.string('lastname');
      tbl.string('password').notNullable();
      tbl.string('username').notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
