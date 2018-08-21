const authRouter = require('./authRouter')
const noteRouter = require('./noteRouter')
const tagRouter = require('./tagRouter')

module.exports = server => {
  server.use('/api', authRouter)
  server.use('/api/notes', noteRouter)
  server.use('/api/tags', tagRouter)
}
