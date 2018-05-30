 const  { userRouter, notesRouter, loginRouter }= require("../controllers/index");
// const { authenticate } = require("../utilities/middleware");
// const userRouter = require("./controllers/userController");
// const loginRouter = require("./controllers/loginController");
// const notesRouter = require("./controllers/noteController/");

module.exports = server => {
  server.get('/', (req, res) => res.send('Welcome to Lambda Notes'));
  server.use('/api/users', userRouter); //get, post; by id: get, put, delete
  // server.use('/api/login', loginRouter); //post
  server.use('/api/notes', notesRouter ); //get, post; by id: get, put, delete. add authenticate later
}                  