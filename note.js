const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
    getNotes,
    addNote,
    db,
};

function getNotes() {
    return db("notes");
}

function addNote(note) {
    return db("notes")
        .insert(note)
}