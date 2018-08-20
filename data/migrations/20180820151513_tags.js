
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
      table.increments();

      table.integer('noteId').references('id').inTable('notes');
      table.string('tag', 16);
      table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
