
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl
            .increments();
        tbl
            .string('title', 255)
            .notNullable();
        tbl
            .string('content')
            .notNullable();
        tbl
            .string('tags');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
