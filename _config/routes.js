const noteRoutes = require('../note/noteRouter')
 const userRoutes = require('../user/userRouter');


module.exports = function(server) {
  server.get('/', (req, res) => {
    res.send({ api: 'running' })
  })

  server.use('/api/notes', noteRoutes);
  server.use('/api/users', userRoutes);

}