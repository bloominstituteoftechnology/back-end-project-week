const db = require("knex")(require("../../knexfile").development);

module.exports = {
  getNotes() {
    let notes = db("notes");
    let tags = db("tags");
    return Promise.all([notes, tag]).then(results => {
      return results;
    });
  }
};
