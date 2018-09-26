const db = require('./index.js');

function getTags() {
  return db('tags');
}

function getTag(title) {
  return db('tags').where({ title: title });
}

function addTag(tag) {
  return db('tags').insert(tag);
}

function getNoteTags(noteId) {
  // SELECT n.title as note, t.title as tag from tags_for_notes as tfn JOIN notes as n ON tfn.note_id = n.id JOIN tags as t ON tfn.tag_id = t.id;
  return db('tags_for_notes as tfn')
    .where({ note_id: noteId })
    .join('notes as n', 'n.id', 'tfn.note_id')
    .join('tags as t', 't.id', 'tfn.tag_id')
    .select('t.id as tag_id', 't.title as tag');
}

function addTagToNote(note_id, tag_id) {
  const newTag = {
    note_id,
    tag_id
  };
  return db('tags_for_notes').insert(newTag);
}

function removeTagFromNote(note_id, tag_id) {
  return db('tags_for_notes')
    .where({ note_id: note_id, tag_id: tag_id })
    .del();
}

module.exports = {
  getTags,
  getTag,
  addTag,
  getNoteTags,
  addTagToNote,
  removeTagFromNote
};
