const knex = require("knex");
// const config = require("../knexfile.js").development;
const config = require("../knexfile.js")['production'];

module.exports = knex(config);