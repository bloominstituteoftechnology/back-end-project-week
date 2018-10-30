
exports.up = function(knex, Promise) {
    return knex.schema.createTable('note', function(tbl){
        tbl.increments();
        tbl.string('title',255).notNullable();
        tbl.string('content',255);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('note');
};
