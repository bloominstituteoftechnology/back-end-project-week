
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', function (table) {
        table.increments();

        table.string('title', 128).notNullable();
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
