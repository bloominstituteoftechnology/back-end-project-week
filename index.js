const server = require("./sever");

const port = 9000;

server.listen(port, () => console.log(`\n Server running on port: ${port} \n`));
