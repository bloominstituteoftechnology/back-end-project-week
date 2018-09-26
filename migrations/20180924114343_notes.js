require('dotenv').config();
const dbConnection = process.env.DATABASE_URL
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    tbl.increments()

    tbl
    .string('title')
    .notNullable
    

    tbl
    .string('content')
    .notNullable
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
