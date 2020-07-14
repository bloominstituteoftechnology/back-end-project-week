exports.up = function(knex, Promise) {
    return knex.schema.table('notes', tbl => {
        tbl.dropColumn('tags');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('notes', function(tbl){
        tbl.json('tags')
    })
};