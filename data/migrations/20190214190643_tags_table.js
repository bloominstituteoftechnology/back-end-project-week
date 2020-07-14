
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', table => {
        table.increments();
        table.integer('note_id').unsigned();
        table.foreign('note_id').references('id').on('notes');
        table.json('tags').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
