const db = require("../dbConfig");

module.exports = {
  async getNotes() {
    return await db("Notes").select();
  },

  async getNote(id) {
    return await db(`Notes`)
      .where({
        id: id
      })
      .select();
  },

  async putNote(note) {
    return await db(`Notes`)
      .where({
        id: note.id
      })
      .update({
        content: note.content,
        title: note.title,
        tags: note.tags,
      });
  },

  async delNote(id) {
    return await db(`Notes`)
      .where({
        id: id
      })
      .del();
  },

  async addNote(noteData) {
    return await db(`Notes`).insert({
      id: noteData.id,
      content: note.content,
      title: note.title,
      tags: note.tags,
    });
  }
};
