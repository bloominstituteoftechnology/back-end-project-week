const server = require("./server")
const mongoose = require("mongoose")
const port = process.env.PORT || 5050

mongoose
  .connect(process.env.MONGODB_URI) // "mongodb://admin:lambda@ds233500.mlab.com:33500/lambda-notes"
  .then(() => console.log("\n~ ~ ~ connected to mongo via mLab ~ ~ ~\n"))
  .catch(() => console.log("\n~ ~ ~ error connecting to mLab databse ~ ~ ~\n"))

server.listen(port, () => console.log(`\n~ ~ ~ server connected to port ${port} ~ ~ ~\n`))