module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./reviewdb.sqlite3"
		},
		useNullAsDefault: true
	}
};
