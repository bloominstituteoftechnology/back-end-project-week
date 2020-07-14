exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table.string('tag', 16).unique('tag').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};
 exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};