//this library cleans the database before running the seed 
// this is future proofing because more robust databases have more information and need to be 'cleaned up' - whatever that means
//not required on SQL lite but _maybe_ is required for bigger data bases 

const knexCleaner = require('knex-cleaner')

exports.seed = function(knex, Promise) {
  return knexCleaner.clean(knex);
};
