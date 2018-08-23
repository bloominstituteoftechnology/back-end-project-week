exports.up = function (knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments();
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function (knex, Promise) {
    knex.schema.dropTableIfExists('notes');
};
