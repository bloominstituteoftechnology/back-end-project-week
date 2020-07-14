
export function up (knex, Promise) {
    return knex.schema.withSchema("public").createTable(`Users`, table => {
      table
        .increments(`id`)
        .primary(), table.string(`username`, 32).notNullable();
      table.string(`password`).notNullable();
    });
}

export function down (knex, Promise) {
    return knex.schema.withSchema("public").dropTableIfExists("Users");
}
