exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', table => {
    table.increments();
    // Title
    table.string('title', 255).notNullable();
    // Content
    table.text('content').notNullable();
    // Timestamp created_at updated_at
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
