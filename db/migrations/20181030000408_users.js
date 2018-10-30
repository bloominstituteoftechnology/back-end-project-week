
exports.up = function (knex, Promise) {
    return knex.schema.createTable(`Users`, table => {
        table.increments(`id`).primary(), 
        table.string(`username`, 32).notNullable();
        table.string(`password`).notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("Users");
};
