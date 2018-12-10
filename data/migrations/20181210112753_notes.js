exports.up = function (knex, Promise) {
    //makes changes to the database
    return knex.schema.createTable('notes', function (tbl) {
      //primary key
      tbl.increments('_id');
      //other fields
      tbl.string('title', 120).notNullable();
      tbl.string('textBody', 1000);
    })
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };
