const noteRouters = require("../api/noteRouters");

const notes = server => {
  server.use("/api/notes", noteRouters);
};

module.exports = {
  noteRouters: notes
};
