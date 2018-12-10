const noteRouters = require("../api/noteRouters");
const userRouters = require("../api/userRouters");

const notes = server => {
  server.use("/api/notes", noteRouters);
};

const users = server => {
  server.use("/api/auth", userRouters);
};

module.exports = {
  noteRouters: notes,
  userRouters: users
};
