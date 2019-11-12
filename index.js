const server = require("./api/server.js")
const port = process.env.PORT || 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});