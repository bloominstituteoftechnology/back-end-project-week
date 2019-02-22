
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function (table) {
        table.increments();
        table.string('title').notNullable().unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
