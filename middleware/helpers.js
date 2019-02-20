
const knex = require("knex");

const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

module.exports = {
    getNotes: (id) => {
      if (id) {
        db('projects').where('id', id).first()
      } else return db('projects')
    },

}