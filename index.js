require('dotenv').config()

const server = require('./server/server');

PORT = process.env.PORT || 4500

server.listen(PORT, () => {
  console.log(`<<== server is running on port ${PORT} ==>>`)
})