const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  getNotes: () => {
    return db("notes")
      .then(rows => {
        let jsonfix = rows.map((e,i)=>{
          console.log(e.tags);
          if(typeof e.tags ==='string'){
            e.tags = JSON.parse(e.tags)
           }
           if (typeof e.checklist ==='string'){
            e.checklist = JSON.parse(e.checklist)
           }
          return e
        })
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
    .then(e=>{
      e=e[0];
      if(typeof e.tags ==='string'){
        e.tags = JSON.parse(e.tags)
       }
       if (typeof e.checklist ==='string'){
        e.checklist = JSON.parse(e.checklist)
       }
      return e
    })
  },
  deleteNote:(id)=>{
    return db("notes")
    .where({"id":id})
    .del();
  },
  editNote: (id, body)=>{
    return db("notes")
    .where({"id":id})
    .update({...body})
  },
  
};