

//== Notes =====================================================================

//-- Dependencies --------------------------------
const config = require('../../config.js');

//-- Create Table --------------------------------
exports.up = function(knex, Promise) {
    return knex.schema.createTable(config.TABLE_NOTES, table => {
        table.increments(config.FIELD_ID).primary();
        table
            .string(config.FIELD_TITLE, config.LIMIT_TITLE)
            .notNullable();
        table
            .string(config.FIELD_BODY, config.LIMIT_BODY)
            .notNullable();
    });
};

//-- Destroy Table--------------------------------
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists(config.TABLE_NOTES);
};
