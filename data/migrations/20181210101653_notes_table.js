
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl) {

        tbl.increments();
        tbl.string('title', 255);
        tbl.string('textBody', 2000);
          
        tbl.timestamps(true, true);
      })
     };
     


exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');

};
