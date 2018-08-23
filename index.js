require('dotenv').config()
const server = require('./server')

//* Sanity Check
server.get('/', (req, res) => res.sendFile('api.html'))

const PORT = process.env.PORT || 5001

server.listen(PORT, () => {
  console.log(`\n=== 🦄   Server listening on port ${PORT} 💩   ===\n`)
})
