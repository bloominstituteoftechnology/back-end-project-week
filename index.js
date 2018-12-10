const server = require("./api/server");

let port = 9000 || process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));
