
exports.up = function (knex, Promise) {
    return knex.schema.createTable('Notes', function (Notes) {
        Notes.increments();

        Notes.string('title', 128).notNullable();
        Notes.text('content').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Notes');
};
