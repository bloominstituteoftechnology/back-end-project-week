
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', notes => {
        notes
            .increments();
        notes
            .string('title', 128)
            .notNullable();
        notes
            .string('content', 500);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
