const { server } = require('.src/server.js');
const PORT = 5000;
server.listen(PORT);
console.log("Server listening on: ", PORT)