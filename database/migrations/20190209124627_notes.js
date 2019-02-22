exports.up = function (knex, Promise) {
    return knex.schema.createTable("notes", notes => {
        // Create unique ids for each note
        notes.increments();

        notes.text("title").notNullable();
        notes.text("textBody");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("notes");
};
