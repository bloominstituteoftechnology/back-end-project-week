const db = require('../dbConfig.js');

module.exports = {
  getAll: () => {
    return db('notes');
  }
};