exports.up = function(knex, Promise) {
    return knex.schema.table('notes', function(table) {
        table.renameColumn('id', '_id');
        table.renameColumn('content', 'textContent');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('notes', function(table) {
        table.renameColumn('_id', 'id');
        table.renameColumn('textContent', 'content');
    });
};