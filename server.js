const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configureRoutes = require("./db/routes");
const server = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
    // If you're moving onto the stretch problem you'll need to set this obj with the appropriate fields
    // ensure that your client's URL/Port can achieve a Handshake
    // then pass this object to the cors() function
};
server.use(express.json());
server.use(cors(corsOptions));
server.use(bodyParser.json());
configureRoutes(server);

module.exports = {
    server,
};

server.get("/", (req, res) => {
    res.send("This is working...");
});