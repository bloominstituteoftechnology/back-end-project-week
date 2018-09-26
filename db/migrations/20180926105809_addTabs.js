
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl.string('tabs', 64)
   
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes')
};
