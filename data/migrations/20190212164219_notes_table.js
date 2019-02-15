
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments();
        table.string('title',800).notNullable();
        table.string('textBody',800).notNullable();
        

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};

