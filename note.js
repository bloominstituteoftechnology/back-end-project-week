const knex = require("knex");
const knexConfig = require("./knexfile.js");
const dbEnvironment = process.env.DB_ENVIRONMENT || 'development';
const db = knex(knexConfig[dbEnvironment]);

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