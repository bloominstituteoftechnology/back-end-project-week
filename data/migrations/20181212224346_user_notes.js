exports.up = function(knex, Promise) {
    return knex.schema.createTable('usernotes', (tbl)=>{
        tbl.increments()
        tbl.string('title')
        tbl.text('content')
        tbl.integer('userID').references('users.id');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('usernotes')
  };