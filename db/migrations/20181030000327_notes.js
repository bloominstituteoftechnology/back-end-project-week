
exports.up = function (knex, Promise) {
    return knex.schema.createTable("Notes", table => {
        table.increments('id').primary();
        table.string("title", 128).notNullable();
        tbl.string('textBody', 100000).notNullable();
        table.text("content").notNullable();
        tbl
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
        
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("Notes");
};
