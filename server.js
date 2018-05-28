const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");

const server = express();

server.get("/", (req, res) => res.send("API Running...!"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
