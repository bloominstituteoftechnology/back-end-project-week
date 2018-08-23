exports.up = function (knex, Promise) {
    return knex.schema.createTable('tags', table => {
        table.increments();
        table.string('tag').notNullable();
        table.integer('note_id').notNullable().unsigned().references('id').inTable('notes').onUpdate('CASCADE').onDelete('CASCADE');
    });
};

exports.down = function (knex, Promise) {
    knex.schema.dropTableIfExists('tags');
};
