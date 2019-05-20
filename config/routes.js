const authRoutes = require('../auth/routes')
const userRoutes = require('../users/routes')

module.exports = function (server) {
  server.get('/', function (req, res) {
    res.send('The web server is up and running!')
  })

  server.use('/api/auth', authRoutes)
  server.use('/api/users', userRoutes)
}