
exports.up = function(knex, Promise) {
  return knex.schema.createTable('note_table', function(table) {
    table
      .increments();
    table
      .string('note_title', 68)
        .notNullable();
    table
      .string('note_body')
        .notNullable();
    table
      .string('note_image');
    table
      .timestamp('created_at')
        .defaultTo(knex.fn.now());
    table
      .integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('note_table')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('note_table');
};
