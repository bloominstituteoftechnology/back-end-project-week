
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes',function(tbl){
        tbl.increments('id');
        tbl.string('title').notNullable();
        tbl.string('textBody',100000).notNullable();
        tbl.string('tags')
        tbl
          .integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
  };
  