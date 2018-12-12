deploying to Heroku troubleshooting:
-add a start script to package.json that read 'node index.js' (or node [entry file])

-if you push and the server breaks, try running it locally first

heroku has issues with sqlite3 and will sometimes clear parts of the db, so we need to migrate everything to a postgres server if we want to host it on heroku

-bring in 'pg' dependency
-make sure dotenv is brought in to keep production infomation provided by db admin secret
-add pg settings in the knexfile
-add postgres as an add-on to your heroku deploy, setting >> reveal config vars >> DATABASE_URL will dynamically change for you based on what it cycles to in heroku
-add process.env.DATABASE_URL as the production.connection for the pg settings in knexfile
-add dynamic variable that first checks your env file for the dynamic process.env engine, otherwise run local sqlite3 server (check dbConfig for further note)
-add dynamic config file(see dbConfig) that checks for DB_ENVIRONMENT variable, if it doesn't find one it uses 'development'
-add DB_ENVIRONMENT (foobar banana) to your config vars in heroku and set it to value 'production'
-last step: run migration of database from sqlite3 to postgres, must be done in heroku via the CLI
command: {
`heroku run` (tells heroku to run a single instance of the next command)
`knex migrate:latest` (the command we want it to run)
`-a fsw14-lambda-notes` (or `-a {heroku app name}`) (tells it which app to run the dyno against) }

-if using seeds: `heroku run knex seed:run -a -fsw14-lambda-notes`
-if using seeds with foreign keys, you need to do a cleanup
`knex seed:make 00-cleanup`
`npm i knex-cleaner`
see seed `cleanup` for code
this cleans the tables before each seed, so any subsequent seeds don't need to use truncate or delete at all
