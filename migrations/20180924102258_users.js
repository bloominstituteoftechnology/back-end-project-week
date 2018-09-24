

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (tbl) => {

    tbl
    .increments()

    tbl
    .string('username', 128)
    .notNullable()

    tbl
    .string('password', 128)
    .notNullable()
    .unique();

    // tbl
    // .integer('notes_id')
    // .unsigned()
    // .notNullable()
    // .reference('id')
    // .inTable('notes')
        
    })
};



exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};

