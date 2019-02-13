require("dotenv").config();

const { server } = require("./api/server.js");

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
