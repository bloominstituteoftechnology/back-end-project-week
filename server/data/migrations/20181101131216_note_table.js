
exports.up = function(knex, Promise) {
  return knex.schema.createTable('note_table', function(table) {
    table
      .autoincrements();
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
    tbl
      .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('note_table');
};
