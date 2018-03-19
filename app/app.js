const server = require('./server');
const port = require('./config').port;

server.listen(process.env.PORT || port, _ => {
  console.log(`Listening on port: ${port}`);
});
