- Create Heroku account on heroku.com
- Install the heroku CLI
- Create new application for you API
- Go to Deploy tab and connect your application to GitHub
  - pick the branch you want deployed
  - click the `Enable Automatic Deploys` Black button
  - click the `Deploy Branch` button
- Click the `Open App` button at the top right to open your api
- change your "start" script in `package.json` to use `node` instead of `nodemon`
- push the changes to GitHub and wait for changes to be deployed in Overview tab
- refresh application
- Profit! not really, still need the dynamic port

To make the port dynamic

- install `dontenv` npm module
- add `require('dotenv').config();` as the first line where your `server.listen()` is.
- make the port dynamic: `server.listen(process.env.PORT)`
- have an endpoint to use for testing that does not try to use the database
- push those changes to GitHub and see if they deploy without errors.
- add a `.env` file to the root of your project and add the `PORT=3333` line inside
- add `.env` to your `.gitignore` file and push the changes to GitHub

Make DB connection dynamic

- open `knexfile.js` and add `require('dotenv').config();` at the top
- add `const dbConnection = process.env.DATABASE_URL` after requiring `dotenv`
- push changes to GitHub
- in heroku.com, go to the `Resources` tab and add the `Heroku Postgres` addon.

Run Migrations and Seeds on the Production Database

- in the command line run `heroku run knex migrate:latest -a yourappname`
- in the command line run `heroku run knex seed:run -a yourappname`
- add `DB=development` to the local `.env` file
- change your knex config file to use:

```js
const dbEngine = process.env.DB || 'development';
const config = require('../knexfile.js')[dbEngine];
```

- go to the `Settings` tab on heroku.com and click the `Reveal Config Vars` button
- add `DB` with the value `production` to the app
- push changes to GitHub