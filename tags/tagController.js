const knex = require('../database/db');

const db = {
  
  getAll() {
    return knex('tags');
  },

  addTag(newTag) {
    return knex.insert(newTag).into('tags');
  },

  getById(id) {
    return knex('tags').where({id});
  },

  updateTag(id, updatedTag) {
    return knex('tags').where({id}).update(updatedTag);
  },

  nuke(id) {
    return knex('tags').where({id}).del();
  },

}

module.exports = db;