exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl){
        tbl.increments();
        tbl.string('title')
           .notNullable();
        tbl.string('textBody');
        tbl.specificType('tags', 'stringarray');
        //will add array?
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};

//knex migrate:make migration_name
//knex migrate:latest
