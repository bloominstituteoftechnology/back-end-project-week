const AUTH_ROUTES = require('../auth/routes')
const USER_ROUTES = require('../users/routes')

module.exports = server => {
  server.get('/', function (req, res) {
    res.send('The web server is up and running!')
  })

  server.use('/api/auth', AUTH_ROUTES)
  server.use('/api/users', USER_ROUTES)
}