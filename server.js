const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { mongoLAB } = require("./api/utils/config");

const server = express();
const port = process.env.PORT || 3000;

server.use(cors({}));

mongoose
  .connect(mongoLAB)
  .then(() => {
    console.log("\n~~~ Connected to MongoDB! ~~~\n");
  })
  .catch(error =>
    console.log("\n --- Error connecting to MongoDB, send help! --- \n")
  );

server.get("/", (req, res) => res.send("API is running!"));

server.listen(port, () => console.log(`Listening on port ${port}`));
