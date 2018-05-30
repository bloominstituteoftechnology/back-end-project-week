const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const noteRouter = require("./Notes/noteController");
const userRouter = require("./Users/userController");

const server = express();
const corsOption = {
  origin: "http://localhost: 3000",
  credentials: true
};

//middleware
server.use(helmet());
server.use(express.json());
server.use(cors(corsOption));

// mongoose
// local
mongoose
  .connect("mongodb://localhost/lambda_notes")
  .then(mongo => {
    console.log("-=- connected to mongo database -=-");
  })
  .catch(err => {
    console.log("!Error, trouble connecting to mongo DB!");
  });

// // mlab deployment
// mongoose
//   .connect("mongodb://admin:adminpw@ds239940.mlab.com:39940/lambda-note_h")

//   .then(mongo => {
//     console.log("-=- connected to mongo database -=-");
//   })
//   .catch(err => {
//     console.log("!Error, trouble connecting to mongo DB!");
//   });

// sanity check
server.get("/", (req, res) => {
  res.json({ Message: "API is working!" });
});

// routes
server.use("/api/notes", noteRouter);
server.use("/api/users", userRouter);

const port = process.env.PORT || 5000;
server.listen(port, err => {
  if (err) console.log(err);
  console.log(`=== Server running on port ${port} ===`);
});
