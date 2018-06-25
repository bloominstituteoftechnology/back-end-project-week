const noteRoutes = require('../note/noteRouter')

module.exports = function(server) {
  server.get('/', (req, res) => {
    res.send({ api: 'running' })
  })

  server.use('/api/notes', noteRoutes)
}