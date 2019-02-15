
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {
        
        tbl.increments(); 
    
        tbl
        .string('title', 255)
        .notNullable();
        
        tbl
        .string('content', 10000)
        .notNullable();
        
    });
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
