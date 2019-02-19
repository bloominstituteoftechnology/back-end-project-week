
exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes')
};

exports.down = function(knex, Promise) {
  return null
};
