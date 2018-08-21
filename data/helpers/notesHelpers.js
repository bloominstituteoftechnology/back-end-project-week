const db = require('../dbConfig');

function find(id) {
  if(!id) {
    return db('notes').select(id);
  } else return db('notes')

}

module.exports = {
  find
}

