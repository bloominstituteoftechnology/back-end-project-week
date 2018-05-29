const express = require("express");
const cors = require("cors");

const server = express();
const port = process.env.port || 3000;

server.use(cors({}));

server.get("/", (req, res) => res.send("API is running!"));

server.listen(port, () => console.log(`Listening on port ${port}`));
