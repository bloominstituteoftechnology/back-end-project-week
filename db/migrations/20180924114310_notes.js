
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {
        tbl.increments();

        tbl.text('title', 128)
        .notNullable();

        tbl.text('textBody');

        tbl.text('tags');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
