// Load .env variables
require("dotenv").config();

const { server } = require("./api/server.js");

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`\n=== Server listening on port ${port} ===\n`);
});
