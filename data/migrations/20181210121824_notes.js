
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl.increments();
        tbl.string('title').notNullable();
        tbl.string('textBody').notNullable();
        tbl.json('tags')
    })
};
 exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
