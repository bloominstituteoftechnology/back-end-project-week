const noteRoutes = require("../api/Routes/noteRoutes");

module.exports = function(server) {
  server.get("/", (req, res) => {
    res.send("API is running...");
  });

  server.use("/notes", noteRoutes);
};
