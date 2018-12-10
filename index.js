require('dotenv').config()
const server = require('./server')
const port = process.env.API_PORT
server.listen(port, () => {
  console.log(`Server listening on ${port}`)
})