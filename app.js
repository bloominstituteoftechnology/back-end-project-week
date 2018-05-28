const server = require("./server")
const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("\n~ ~ ~ connected to mongo via mLab ~ ~ ~\n"))
  .catch(() => console.log("\n~ ~ ~ error connecting to mLab databse ~ ~ ~\n"))

server.listen(process.env.PORT || 8080, () => console.log("\n~ ~ ~ server connected to port 8080 ~ ~ ~\n"))