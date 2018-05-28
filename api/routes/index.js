const userRouter = require("../controllers/users.controller");
const loginRouter = require("../controllers/login.controller");
const notesRouter = require("../controllers/notes.controller");
const { authenticate } = require("../middleware");

module.exports = server => {
  server.get('/', (req, res) => res.send('server is functional'))
  server.use('/api/users', userRouter)
  server.use('/api/login', loginRouter)
  server.use('/api/notes', authenticate, notesRouter)
}