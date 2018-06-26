const noteRoutes = require("../Routes/noteRoutes");

module.exports = function(server) {
  server.get("/", (req, res) => {
    res.send("API is running...");
  });

  server.use("/notes", noteRoutes);
};
