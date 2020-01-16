const db = require('../dbConfig');

function getAll() {
  return db.select('email', 'username').from('users');
}

async function get(id) {
  try {
    const user = await db
      .select('email', 'username')
      .from('users')
      .where({ id })
      .first();
    const notes = await db('notes').where({ user_id: id });
    user.notes = notes;
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAll,
  get
  // insert,
  // update,
  // remove
};
