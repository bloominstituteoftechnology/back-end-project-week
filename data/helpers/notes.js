const db = require('../dbConfig');

module.exports = {
  get: function(id){
    let query = db('notes');

    if(id){
      query.where({ id }).first();
    }

    return query;
  }, //get all recipes or a recipe by id
  add: function(title, content){
    let query =  db('notes')
      .insert({ title, content })
      .then(ids => ({ id: ids[0] }));

    return query;
  }
}
