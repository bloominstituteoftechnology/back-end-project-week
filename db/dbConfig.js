
let env = process.env.NODE_ENV || "development";
env === "test" || env === undefined ? (env = "development") : (env = "production");
const config = require("../knexfile")[env];

module.exports = require("knex")(config);
