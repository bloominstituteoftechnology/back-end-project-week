const { handleErr } = require('../api/util')

module.exports = app => {
  app.use('/user', require('../api/user'))
  app.use('/note', require('../api/note'))
  app.use('/', (req, res) => res.json({ test: 'hello' }))
  app.get('env') === 'development'
    ? app.use(handleErr)
    : app.use((err, req, res, next) => res.status(500).json({ err: err.message }))
}