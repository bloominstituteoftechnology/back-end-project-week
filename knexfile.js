// Update with your config settings.

module.exports = {
	development: {
		client: 'MySQL',
		connection: {
			database: 'notes',
			user: 'user1',
			password: 'user1'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './database/migrations',
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	},

	production: {
		client: 'MySQL',
		connection: {
			host: 'mongodb://user1:pass1@ds119129.mlab.com:19129/notes',
			database: 'notes',
			user: 'user1',
			password: 'user1'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './database/migrations',
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	}
};
