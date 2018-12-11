const server = require("./api/server");

let port = process.env.PORT || 9000;
server.listen(port, () => console.log(`Server started on port ${port}`));
