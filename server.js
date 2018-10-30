const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configureRoutes = require("./db/routes");
const server = express();
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);


server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("API Running, Keep Coding");
});
server.listen(5500, () => console.log('\nrunning on port 5500\n'));
server.use(cors({ origin: "http://localhost:3000" }));
    
server.use(express.json());
server.use(bodyParser.json());

module.exports = {
    server,
};

