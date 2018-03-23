const server = require('./server');

const port = JSON.parse(process.env.CONFIG).port;

server.listen(process.env.PORT || port, _ => {
  console.log(`Listening on port: ${port}`);
});
