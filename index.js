// for initiating server
const server = require('./server/server')

const port = 3300

server.listen(port, () => { console.log(`Server is listening on port ${port}`) })