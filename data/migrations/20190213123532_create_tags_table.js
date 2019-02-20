exports.up = function (knex) {
    return knex.schema.createTable('tags', function (tags) {
        tags.increments();
        tags.string('tag', 50).notNullable().unique('tag');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tags');
};