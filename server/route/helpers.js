const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);



getNotes = () => {
  return db('note_table');
};

// export 
module.exports = {
  getNotes
};