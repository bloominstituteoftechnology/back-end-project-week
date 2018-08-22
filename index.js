const server = require('express')()
require('./api/middleware/')(server)
require('./api/routes')(server)

const port = process.env.PORT || 8000

server.listen(port, () => {
  console.log(`\n=== API RUNNING...${port} ===\n`)
})
