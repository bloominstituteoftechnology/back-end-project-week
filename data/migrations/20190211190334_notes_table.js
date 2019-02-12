
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments();
        table.string('Title').notNullable();
        table.text('Content');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
