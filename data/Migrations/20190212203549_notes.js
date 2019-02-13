
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments('id');
        table.string('title', 25).notNullable();
        table.text('body').notNullable();
    });
}
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
