
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', function (notes) {
        notes.increments();

        notes.string('title', 128).notNullable();
        notes.text('content').notNullable();
        notes
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
