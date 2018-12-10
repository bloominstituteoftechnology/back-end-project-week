const db = require('./dbConfig')

module.exports = {
  getNoteList: () => db('notes'),

  addNote: note => db('notes')
    .insert(note),

  getNote: id => db('notes')
    .where({id: id}),

  updateNote: note => db('notes')
    .where({id: note.id})
    .update(note),

  deleteNote: id => db('notes')
    .where({id: id})
    .del()
}