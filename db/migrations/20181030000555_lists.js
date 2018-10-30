
exports.up = function (knex, Promise) {
    return knex.schema.createTable('List_Notes', table => {
        table.integer('list_id').references('id').inTable('Lists')
        table.integer('notes_id').references('id').inTable('Notes')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('List_Notes')
};
