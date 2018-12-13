const server = require("./server");
const port = process.env.PORT || 3400;


server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
