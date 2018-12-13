

//==============================================================================

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './database/dev.sqlite3'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds',
        },
    },
};
