// const knex = require("knex")

// const KnexConfig = require("../knexfile");

// module.exports = knex(KnexConfig.development);

const dbEnvironment = process.env.DB_ENVIRONMENT || "development";

const config = require("../knexfile")[dbEnvironment];

module.exports = require("knex")(config);
