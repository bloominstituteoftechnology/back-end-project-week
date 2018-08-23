const { server } = require('./server');
const port = process.env.PORT || 8888;

server.listen(port, () => {
  console.log(`Node-Express API running on ${port}. . .`)
});

// memo: from here, look at server.js