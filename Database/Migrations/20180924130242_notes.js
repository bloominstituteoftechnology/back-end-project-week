
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', (tbl) => {
        tbl
        .increments('id')
    
        tbl
        .string('title', 80)
        .notNullable()
    
        tbl
        .string('content')
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes')
};
