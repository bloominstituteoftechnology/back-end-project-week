const knexCleaner = require('knex-cleaner');

exports.seed = function(knex, Promise) {
  return knexCleaner.clean(knex);
};
