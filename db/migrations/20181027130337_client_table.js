exports.up = function(knex, Promise) {
    return knex.schema.createTable('client', function(tbl){
        tbl.increments();
        tbl.string('api_name')//slack
        tbl.string('api_client_id')//client id
        tbl.string('api_client_secret')//client secret
        tbl.string('redirect_uri')       
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('client')
  };
  