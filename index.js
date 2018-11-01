const { server } = require('./server.js');

const port = 9900;
server.listen(port, () => {
  console.log(`\n====running on port ${port}====\n`)
});