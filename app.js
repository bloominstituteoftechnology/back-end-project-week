const mongoose = require("mongoose");
const server = require("./server");
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://@ds239940.mlab.com:39940/lambdanotes",
  {},
  err => {
    if (err) return console.log("Error Connecting to DataBase");
    console.log("Connected to Mongo.");
  }
);

server.listen(port, () => {
  console.log(`Server Running On ${port}`);
});