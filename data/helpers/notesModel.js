const db = require('../dbConfig.js');

module.exports = {
  create: note => {
    return db('notes')
      .insert(note)
      .then(ids => ({ id: ids[0] }));
  },
  readAll: () => {
    return db('notes')
    .select();
  },
  read: id => {
    return db('notes')
      .where({ id: Number(id) });
  },
  update: (id, note) => {
    return db('notes')
      .where('id', Number(id))
      .update(note);
  },
  remove: id => {
    return db('notes')
      .where('id', Number(id))
      .del();
  }
};