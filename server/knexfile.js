module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./data/notedb.sqlite3"
		},
		useNullAsDefault: true
	}
};
