const server = require('./server');

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log(`\n Server has started on port ${port} \n`)
);
