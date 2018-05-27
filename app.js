const server = require("./server")
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://admin:lambda@ds233500.mlab.com:33500/lambda-notes")
  .then(() => console.log("~ ~ ~ connected to mongo via mLab ~ ~ ~"))
  .catch(() => console.log("~ ~ ~ error connecting to mLab databse ~ ~ ~"))

server.listen(8080, () => console.log("~ ~ ~ server connected to port 8080 ~ ~ ~"))