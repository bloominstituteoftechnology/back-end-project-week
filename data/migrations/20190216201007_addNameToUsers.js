
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('first_name');
    table.string('last_name');
  })
};

exports.down = function(knex, Promise) {
  
};
