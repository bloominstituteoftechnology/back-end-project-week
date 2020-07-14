
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes_table_two', function(tbl) {
        tbl.increments();

        tbl
        .string('title', 150)
        .notNullable();

        tbl
        .string('textBody', 1000)
        .notNullable();

        tbl
        .timestamp('created_at') // default to timestamptz in PostgreSQL unless true
        .defaultTo(knex.fn.now());
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropIfTableExists('notes_table_two')
  
};
