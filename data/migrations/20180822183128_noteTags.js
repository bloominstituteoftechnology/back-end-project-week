
exports.up = function (knex, Promise) {
    return knex.schema.createTable('noteTags', function (table) {
        table.increments();

        table
            .integer('noteId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('notes');
        table
            .integer('tagId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tags');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('noteTags');
};
