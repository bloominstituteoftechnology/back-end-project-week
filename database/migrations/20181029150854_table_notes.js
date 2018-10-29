
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(table) {
        table.increments();
  
        table.string('title', 22).notNullable();
        table.string('textBody', 255).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};
