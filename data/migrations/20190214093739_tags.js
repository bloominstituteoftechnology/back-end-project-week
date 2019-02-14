
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
      table.increments();
      table.string('tagTitle', 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
