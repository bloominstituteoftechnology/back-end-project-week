require("dotenv").config(); // loads .env configuration

const { server } = require("./server.js");

const port = process.env.PORT || 9900;
server.listen(port, () => {
  console.log(`\n====Running on port ${port}====\n`);
});
