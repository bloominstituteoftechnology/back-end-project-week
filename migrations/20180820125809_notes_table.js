
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl.increments('id').unique('id');
        tbl
            .string('title', 30)
            .notNullable();
        tbl
            .string('content')
            .defaultTo('Not Provided');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
