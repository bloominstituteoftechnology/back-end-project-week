
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl.increments(); 
        tbl.string('title', 50).notNullable(); 
        tbl.string('content', 128).notNullable(); 
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes');
};
