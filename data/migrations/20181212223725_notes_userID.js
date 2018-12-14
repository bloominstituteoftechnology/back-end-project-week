
exports.up = function(knex, Promise) {
    return knex.schema.table('notes', (tbl)=>{
        tbl.integer('userID').references('users.id');
    } )
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('notes').dropColumn('userID');
  };
