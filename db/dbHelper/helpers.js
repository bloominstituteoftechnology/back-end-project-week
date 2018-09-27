"use strict";

const db = require("../dbConfig.js");

module.exports = {
  async getNotes() {
    return await db(`Notes`).select();
  },

  async getNote(id) {
    return await db(`Notes`)
      .where({
        id: id,
      })
      .select();
  },

  async updateNote(id, note) {
    return await db(`Notes`)
      .where({
        id: id,
      })
      .update({
        title: note.title,
        content: note.content,
      });
  },

  async delNote(id) {
    return await db(`Notes`)
      .where({
        id: id,
      })
      .del();
  },

  async addNote(noteData) {
    return await db(`Notes`).insert(noteData);
  },
};
