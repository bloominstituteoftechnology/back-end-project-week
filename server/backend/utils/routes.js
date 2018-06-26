const NoteRoutes = require("../routes/noteRoutes");
const UserRoutes = require("../routes/userRoutes");

module.exports = function(server) {
  server.get("/", function(req, res) {
    res.send({ api: "up and running" });
  });
  server.use("/notes", NoteRoutes);
  server.use("/users", UserRoutes);
};
