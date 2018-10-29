const { server } = require("server.js");

// ---- Port Declaration ----
const port = process.env.port || 5500;
server.listen(port, () => {
  console.log(`\n == Server listening on Port ${port}. \n`);
});
