exports.up = function(knex, Promise) {
    // makes the changes to the database
    return knex.schema.createTable('notes', function(tbl) {
        // primary key
        tbl.increments(); 
    
        // other fields - note title and content
        tbl
        .string('title', 255)
        .notNullable()
        tbl
        .string('content', 3000)
        .notNullable()
/*
        tbl
        .string('author', 255)
        .unique()
        .notNullable()
        /foreign id --- may use later for tags 
        tbl
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts_table');*/
    
      });
    };


exports.down = function(knex, Promise) {
  // undo the changes to the database (it's called rolling back changes)
  return knex.schema.dropTableIfExists('notes');
};
