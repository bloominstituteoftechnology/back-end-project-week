
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', (table) => {
        table.increments('_id');

        table
            .string('title', 128)
            .notNullable();

        table
            .text('textBody')
            .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
