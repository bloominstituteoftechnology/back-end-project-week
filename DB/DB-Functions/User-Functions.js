const knex = require("knex")
const config = require('../../knexfile')
const DB = knex(config.development)

module.exports = {
 register: () => {
  return DB('users')
           .insert(user)
           .then(ids => ({id: ids[0]}))
 },
 
 login: (user) => {
  return DB('users')
           .where('username', user.username)
           .then((ids) => ({id: ids[0]}))
 },

 logout: () => {

 }
}