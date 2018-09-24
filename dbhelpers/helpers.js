const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  getNotes: () => {
    return db("notes")
      .then(rows => {
        return rows;
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  addNote: (body) => {
    return db("notes").insert({ ...body });
  },
  getSingleNote:(id)=>{
    return db("notes")
    .where({"notes.id":id})
  },
  deleteNote:(id)=>{
    return db("notes")
    .where({"id":id})
    .del();
  },
  // edit: (id, body,which)=>{
  //   return db(which)
  //   .where({"id":id})
  //   .update({...body})
  // },
  
};