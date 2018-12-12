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
