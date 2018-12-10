
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', tbl => {
        tbl.increments()
        tbl.text('tag')

        tbl
        .integer('notes_id')
        .unsigned()
        .references('id')
        .inTable('notes')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags')
};
