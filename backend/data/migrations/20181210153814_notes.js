
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments()
        table.string('title', 140).notNullable()
        table.text('content').notNullable()
    })
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};