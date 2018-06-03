const userRoutes = require("../users/userRoutes");
const noteRoutes = require("../notes/noteRoutes");
const authRoutes = require("../auth/authRoutes");

module.exports = function(server) {
  server.get("/", (req, res) => {
    res.json({ message: "all good homie" });
  });

  server.use("/api/users", userRoutes);
  // server.use("/api/notes", noteRoutes);
  // server.use("api/auth", authRoutes);
};
