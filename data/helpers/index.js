const db = require("knex")(require("../../knexfile").development);
module.exports = {
  checkTags(id, tagsArr) {
    return db("tags")
      .where("note_id", id)
      .then(records => {
        let existent = records.map(record => {
          record.tag;
        });
        let filteredTags = tagsArr.filter(tag => {
          return !existent.some(ele => ele === tag);
        });
        return filteredTags;
      });
  },
  getNotes() {
    let notes = db("notes");
    let tags = db("tags");
    return Promise.all([notes, tags]).then(results => {
      return results;
    });
  },
  getNote(id) {
    let note = db("notes")
      .where("id", id)
      .first();
    let tags = db("tags").where("note_id", id);
    return Promise.all([note, tags]).then(results => {
      return results;
    });
  },
  addNoteWithTags(note) {
    let { title, textBody, tags } = note;
    return db("notes")
      .insert({ title, textBody })
      .then(id => {
        let noteId = id[0];
        let tagsObjsArr = tags.map(tagEl => ({
          tag: tagEl,
          note_id: noteId
        }));
        return db("tags")
          .insert(tagsObjsArr)
          .then(ids => {
            return noteId;
          });
      });
  },
  deleteNote(id) {
    return db("notes")
      .where("id", id)
      .del()
      .then(response => {
        return db("tags")
          .where("note_id", id)
          .del();
      });
  },
  updateNote(id, note) {
    let { title, textBody, tags } = note;
    return db("notes")
      .where("id", id)
      .update({ title, textBody })
      .then(response => {
        return checkTags(id, tags);
      });
  }
};
