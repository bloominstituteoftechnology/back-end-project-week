require("dotenv").config(); //dotenv config called to load any .env content

const server = require("./api/server");

// runs on port in .env file if it finds one, otherwise 7000
const port = process.env.PORT || 7000;

server.listen(port, () =>
  console.log(`\n=== Server running on port ${port} ===\n`)
);
