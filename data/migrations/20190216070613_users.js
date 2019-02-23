
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('username', 90).notNullable().unique();
        table.string('password', 90).notNullable();
        table.string('firstName', 30);
        table.string('lastName', 50);
        table.string('email', 70);
        table.string('phone', 18);
        table.string('password2', 90);
        table.string('username2', 90);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
