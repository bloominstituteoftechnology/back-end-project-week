const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy('/auth/google', { target: "http://localhost:5000" }));
  app.use(proxy('/api/*', { target: "http://localhost:5000" }));
<<<<<<< HEAD
  app.use(proxy('*', { target: "http://localhost:5000/api/notes" }));
=======
  app.use(proxy('*', { target: "http://localhost:5000/api/notes" }));
>>>>>>> ec42d54d5138396f4c4f13696a786619343425db
};
