const server = require('./server');
const port = 3030;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
