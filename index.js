require("dotenv").config();

const server = require("./api/server");
const port = process.env.PORT || 3300;

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
