const express = require("express");
const port = process.env.PORT || 5001;
const database = require("./backend/utils/database");
const middleware = require("./backend/utils/middleware");
const routes = require("./backend/utils/routes");

const server = express();

middleware(server);
routes(server);

database
  .connectTo("lambda-Notes")
  .then(() => {
    console.log("\n... API Connected to lambda-Notes Database ...\n");
    server.listen(`${port}`, () =>
      console.log(`\n=== API running on port ${port} ===\n`)
    );
  })
  .catch(err => {
    console.log("\n*** ERROR Connecting to MongoDB, is it running? ***\n", err);
  });
