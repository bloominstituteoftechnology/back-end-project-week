
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
      table.increments();

      table.string('tag', 128);
      table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
