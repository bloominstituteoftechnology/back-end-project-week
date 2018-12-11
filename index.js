require("dotenv").config();

const server = require("./api/server.js");

let port = process.env.PORT;
if (port == null || port == "") {
    port = 9000;
}

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));