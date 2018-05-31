const server = require("./server");
const mongoose = require("mongoose");


const port = process.env.PORT || 2020;
mongoose.Promise = global.Promise;
let url = `mongodb://Nschennum:Nschennum1@ds239930.mlab.com:39930/users_notes`;
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to db");
  })
  .catch(err => {
    console.log("error connecting to db");
  });

  server.listen(port, err => {
    if (err) console.log(err); 
    console.log(`Happening on ${port}!`)
});