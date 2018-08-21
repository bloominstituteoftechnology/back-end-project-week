exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (notes) => {
    notes.increments('id');
    notes.string('title', 20).unique();
    notes.text('textBody');
    notes.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};

