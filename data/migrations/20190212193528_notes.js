
exports.up = function(knex, Promise) {
   return knex.schema.createTable('notes', function (table) {
          table.increments();
          table.string('title').notNullable();
          table.string('content', 1000).notNullable();
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
