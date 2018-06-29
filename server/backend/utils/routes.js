const NoteRoutes = require("../routes/noteRoutes");
const UserRoutes = require("../routes/userRoutes");
const port = process.env.PORT || 3333;

module.exports = function(server) {
  server.get("/", function(req, res) {
    res.send({ api: "It Lives!!!" });
  });

  server.get('/notelist', notes); 
  server.post('/createnote', notes);
  server.delete('/:id', notes);
  server.put('/:id', notes);   
  server.use('/users', userRoutes);
  server.use('/users', createUser);
};
