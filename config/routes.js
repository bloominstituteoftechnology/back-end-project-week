const db = require("../database/dbConfig");

module.exports = server => {
  server.get("/", root);
};

function root(req, res) {
  res.status(200).json("Up and running");
}
