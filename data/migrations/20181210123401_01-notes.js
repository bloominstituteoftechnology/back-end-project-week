
exports.up = function(knex, Promise) {
          // make changes to the database
          return knex.schema.createTable('notes', table => {

            // primary key
            // by default it generates an id field and make it autoincrement and the primary key. Default tbl.increments('id');
            table.increments();
        
            // other fields
            table.string('title', 255).notNullable();
            table.string('textBody', 2048).notNullable();
            table.timestamps(true, true);
          })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};
