require('dotenv').config() // load the .env file content
const server = require('./server.js')

const port = process.env.PORT || 9000
server.listen(port, () => console.log(`server listening on port ${port}`))