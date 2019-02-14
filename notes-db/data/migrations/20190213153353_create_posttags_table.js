
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('posttags', function (posttags) {
            posttags.increments();
            posttags
                .integer('postId')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('posts');
            posttags
                .integer('tagId')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('tags');
        });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posttags');
};
