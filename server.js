const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { mongoLAB } = require("./api/utils/config");
const routes = require("./api/routes/routes");

const server = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "https://serene-crag-28345.herokuapp.com/",
  credentials: true
};

server.use(cors(corsOptions));
server.use(bodyParser.json());

// ===== Connect to MongoDB =====
mongoose
  .connect(mongoLAB)
  //   .connect("mongodb://localhost/backendweek")
  .then(() => {
    console.log("\n~~~ Connected to MongoDB! ~~~\n");
  })
  .catch(error =>
    console.log("\n --- Error connecting to MongoDB, send help! --- \n")
  );

// Server routes
routes(server);

// ===== Verify API is working ======
server.get("/", (req, res) => res.send("API is running!"));

server.listen(port, () => console.log(`Listening on port ${port}`));
