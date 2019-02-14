
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.integer('note_id').unsigned().notNullable();
        table.foreign('note_id').references('id').on('notes');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
