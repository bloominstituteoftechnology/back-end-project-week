exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(tbl){
        tbl.increments();
        tbl.string('title')
           .notNullable();
        tbl.string('textBody');
        tbl.string('tags');
        tbl.integer('userid')
           .unsigned()
           .notNullable()
           .references('id')
           .inTable('users')
        tbl.bool('isPublic')
            .notNullable()
            .defaultsTo(false)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};

//knex migrate:make migration_name
//knex migrate:latest
