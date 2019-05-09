const authRoutes = require('../auth/authRoutes')
const userRoutes = require('../users/userRoutes')

module.exports = function (server) {
  server.get('/', function (req, res) {
    res.send('The web server is up and running!')
  })

  server.use('/api/auth', authRoutes)
  server.use('/api/users/', userRoutes)
}

