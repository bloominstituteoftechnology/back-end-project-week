const db = require('../dbConfig');

function getAll() {
  return db('notes');
}

module.exports = {
  getAll
};
