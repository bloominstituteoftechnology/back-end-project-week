exports.up = function(knex, Promise) {
   
    return knex.schema.createTable('notes', function(tbl) {
        
        tbl.increments(); // pk
    
        tbl // data fields and attributes
        .string('title', 288)
        .notNullable()
        tbl
        .string('content', 3333)
        .notNullable()
        
      });
    };

 exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes'); // undo === Rollback
};