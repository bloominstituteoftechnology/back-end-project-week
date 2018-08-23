
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', function (tbl) {
        tbl.increments().primary();

        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user');

        tbl.string('title', 128).notNullable();
        tbl.text('content').notNullable();
        tbl.boolean('completed').defaultTo(false);

        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
