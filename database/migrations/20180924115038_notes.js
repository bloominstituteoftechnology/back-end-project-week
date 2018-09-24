exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', notes => {
        notes
          .increments()
          .notNullable()
    
        notes
          .string('title', 128)
          .notNullable()
        
        notes
          .string('note', 128)
          .notNullable()
        });
    };
    
    exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('notes');
    };
    