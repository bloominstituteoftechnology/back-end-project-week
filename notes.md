# Heroku deployment

- const port = process.env.PORT || 3600;
- in package.json, make sure to add this script: "start": "node index.js"

* yarn add dotenv and pg
* add code below to knexfile.js

production: {
client: "pg",
connection: {
//can be an object or a string
host: "", // address to find the db server
database: "",
user: "",
password: ""
},
pool: {
mind: 2,
max: 10
},
migrations: {
directory: "./data/migrations"
},
seeds: {
directory: "./data/seeds"
}
}

# Heroku

Heroku > Resources > Add-ons > Search "postgres" > Click "Provision"
Does 2 things:

- Creating a db server for our acct
- Adding connection between the app (API) and the db server
