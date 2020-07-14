const knex = require("knex")
const config = require('../../knexfile')
const DB = knex(config.development)

module.exports = {
 pull: () => {
  return DB('notes')
 },

 pullById: (id) => {
  return DB('notes')
           .where({id: id})
 },

 place: (note) => {
  return DB('notes')
           .insert(note)
           .then((ids) => ({id: ids[0]}))
 },

 alter: (id, note) => {
  return DB('notes')
           .where({id: id})
           .update(note)
 },

 clear: (id) => {
  return DB('notes')
           .where({id: id})
           .del()
 }
}