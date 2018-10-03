
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',function(tbl){
        tbl.increments('id');
        tbl
          .string('username',32)
          .notNullable()
          .unique()
        tbl
          .string('password')
          .notNullable()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  