const server = require("./server");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb://${config.username}:${
      config.password
    }@ds239930.mlab.com:39930/users_notes`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(err => {
    console.log("error connecting to db");
  });

  const port = process.env.PORT || 2020; 

  server.listen(port, err => {
    if (err) console.log(err); 
    console.log(`Happening on ${port}!`)
});