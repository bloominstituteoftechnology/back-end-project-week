
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
      table.increments();
      table.string('tagTitle', 255).notNullable();
      table.integer('notes_id').unsigned();
      table.foreign('notes_id').references('id').on('notes');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
