const db = require('../dbConfig.js');

module.exports = {
  readAll: () => {
    return db('notes');
  },
  read: id => {
    return db('notes')
      .where({ id: Number(id) });
  },
  create: note => {
    return db('notes')
      .insert(note)
      .then(ids => ({ id: ids[0] }));
  }
};