
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
    tbl.increments();

    tbl
    .string('username',40)
    .notNullable()
    .unique();

    tbl
    .string('password', 130)
    .notNullable();
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
