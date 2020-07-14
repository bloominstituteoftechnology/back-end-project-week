
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl
            .increments();
        tbl
            .string('title', 255)
            .notNullable();
        tbl
            .string('textBody')
            .notNullable();
        tbl
            .string('tags');
        tbl
            .integer('users_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};