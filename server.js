const express = require("express");

// const port = process.env.PORT || 3333;
const db = require("./_config/db");
const setupMiddleware = require("./_config/middleware");
const setupRoutes = require("./_config/routes");

const server = express();

db
  .connect()
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

setupMiddleware(server);
setupRoutes(server);

server.listen(process.env.PORT || 3333, err => {
  if (err) console.log(err);
  console.log(`server running on port ${port}`);
});
//
