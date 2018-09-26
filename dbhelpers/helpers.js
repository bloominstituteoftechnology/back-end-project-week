const knex = require("knex");
const dbEngine = process.env.DB || 'development';
const config = require('../knexfile.js')[dbEngine];
const db = knex(config);

module.exports = {
  getNotes: (userID) => {
    return db("notes")
    .where({"userID":userID})
      .then(rows => {
        let jsonfix = rows.map((e,i)=>{
          if(! e.tags){
            e.tags = []
           }
           if(! e.checklist){
            e.checklist = []
           }
          if(typeof e.tags ==='string'){
            e.tags = JSON.parse(e.tags)
           }
           if (typeof e.checklist ==='string'){
            e.checklist = JSON.parse(e.checklist)
           }
          return e
        })
        return jsonfix;
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