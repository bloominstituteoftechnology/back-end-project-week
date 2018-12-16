const NoteRoutes = require("../routes/noteRoutes");
const UserRoutes = require("../routes/userRoutes");
const port = process.env.PORT || 5001;

module.exports = function(server) {
  server.get("/", function(req, res) {
    res.send({ api: "It Lives!!!" });
  });

  server.get('/notelist', NoteRoutes); 
  server.post('/createnote', NoteRoutes);
  server.delete('/:id', NoteRoutes);
  server.put('/:id', NoteRoutes);   
  server.use('/users', UserRoutes);
  server.use('/users', createUser);
};
