const db = require("knex")(require("../../knexfile").development);

module.exports = {
	getNotes() {
		return db("notes");
	},
};
