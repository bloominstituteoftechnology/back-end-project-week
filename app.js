const mongoose = require("mongoose");
const server = require("./server");
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://test:test@ds163769.mlab.com:63769/lambda-notes",
  {},
  err => {
    if (err) return console.log("Error connecting to the database");
    console.log("Connected to Mongo.");
  }
);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
