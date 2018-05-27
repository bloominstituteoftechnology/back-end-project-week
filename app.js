const server = require("./server")
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://admin:lambda@ds233500.mlab.com:33500/lambda-notes")
  .then(() => console.log("\n~ ~ ~ connected to mongo via mLab ~ ~ ~\n"))
  .catch(() => console.log("\n~ ~ ~ error connecting to mLab databse ~ ~ ~\n"))

server.listen(8080, () => console.log("\n~ ~ ~ server connected to port 8080 ~ ~ ~\n"))