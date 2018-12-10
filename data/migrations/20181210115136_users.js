
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl){
      tbl.increments();
      tbl.string('name', 250).notNullable();
      tbl.string('password', 100).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
