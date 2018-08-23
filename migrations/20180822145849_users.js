
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (tbl) {
        tbl.increments().primary();

        tbl.string('username', 128).notNullable().unique();
        tbl.string('password').notNullable();

        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
