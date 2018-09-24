
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl.increments(); 
        tbl.string('Title', 50).notNullable(); 
        tbl.string('Content', 128).notNullable(); 
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes');
};
