
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (notes) => {
      notes.increments()

      notes.string('title', 255).notNullable();
      notes.text('note').notNullable();

      notes.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
