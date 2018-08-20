const db = require('../dbConfig.js');

module.exports = {
  readAll: () => {
    return db('notes');
  },
  create: note => {
    return db('notes')
      .insert(note)
      .then(ids => ({ id: ids[0] }));
  }
};