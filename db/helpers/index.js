
const db = require('knex')(require('../../knexfile').development);

module.exports = {
 getAllNotes() {
   return db('notes')
   .select('note_id as id', 'title', 'textBody', 'tag_name as tags')
     .join('tags', 'notes.id', 'tags.note_id');
 },
 addNote(note) {
  return db('notes')
    .insert(note)
    .then(([id]) => id);
},

addNoteWithTags(note, tags) {
  let noteID = null;
  return this.addNote(note)
    .then(id => {
      noteID = id;
      return this.addTags(tags, id);
    })
    .then(() => noteID);
},

};