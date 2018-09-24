const db = require('../dbConfig');

module.exports = {
  get: function(id){
    let query = db('notes');

    if(id){
      query.where({ id }).first();
    }

    return query;
  }, //get all recipes or a recipe by id
}
