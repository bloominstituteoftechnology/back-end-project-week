const db = require("../data/dbConfig.js");

module.exports = {
fetch: (id) => {
  if (id) {
    return db("notes").where("id", id);
  }
  return db("notes");
},
insert: (note) => {
  return db("notes").insert(note);
},
update: (id, note) => {
  return db("notes")
  .where("id", id)
  .update(note);
},
remove: (id) => {
  return db("notes")
    .where("id", id)
    .del();
}
};