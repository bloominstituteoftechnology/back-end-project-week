
exports.up = function(knex, Promise) {
    return knex.schema.table('Notes', eachColumn => {
        eachColumn.renameColumn('Note-Title', 'noteTitle');
        eachColumn.renameColumn('Note-Body', 'noteBody');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('Notes', eachColumn => {
        eachColumn.renameColumn('noteTitle', 'Note-Title');
        eachColumn.renameColumn('noteBody', 'Note-Body');
    })
};
