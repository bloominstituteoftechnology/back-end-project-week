const { server } = require("./api/server.js");

const port = 4400;

server.listen(port, () => {
    console.log(`\n=== Server listening on port ${port} ===\n`);
});