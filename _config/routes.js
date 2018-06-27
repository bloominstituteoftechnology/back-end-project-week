const NotesRoutes = require('../notes/NotesRoutes');
const UsersRoutes = require('../users/UsersRoutes');

const setupRoutes = (server) => {
  server.get("/", (req, res) => {
    res.status(200).json({ message: "I am alive" })
  })
  server.use("/notes", NotesRoutes);
  server.use("/users", UsersRoutes);
}

module.exports = setupRoutes;