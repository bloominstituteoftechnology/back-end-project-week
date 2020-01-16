const db = require('../dbConfig');

function getAll() {
  return db('notes');
}

function get(id) {
  return db('notes')
    .where({ id })
    .first();
}

async function insert(note) {
  try {
    const [id] = await db('notes').insert(note, 'id');
    return get(id);
  } catch (error) {
    console.log(error);
  }
}

async function update(changes, id) {
  try {
    await db('notes')
      .where({ id })
      .update(changes);
    return get(id);
  } catch (error) {
    console.log(error);
  }
}

async function remove(id) {
  try {
    const count = await db('notes')
      .where({ id })
      .del();
    return count;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAll,
  get,
  insert,
  update,
  remove
};
