

exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', (tbl) => {

    tbl
    .increments()

    tbl
    .string('title', 128)
    .notNullable()

    tbl
    .string('content')
    .notNullable()
    .unique();


    })
};



exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};
