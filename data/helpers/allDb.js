const db = require('../db');
 module.exports = {
  get: table => {
    return db(table);
  },
   getById: (table, id) => {
    id = Number(id);
    return db(table).where({ id }).first();
  },
   add: (table, item) => {
    return db(table).insert(item).then(ids => ({id: ids[0]}));
  },
   edit: (table, id, item) => {
    id = Number(id)
    return db(table).where({ id }).update(item);
  },
   delete: (table, id) => {
    id = Number(id);
    return db(table).where({ id }).del();
  }
}