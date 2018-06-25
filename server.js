const mongoose = require("mongoose");

const { MONGODB_URI } = require("./Config/config");

mongoose.connect(
  MONGODB_URI,
  {},
  err => {
    if (err) console.log("Database connection failed");
    console.log("Successfully Connected to MongoDB");
  }
);

const setupMiddleware = require("./setup/middleware");
const setupRoutes = require("./setup/routes");

server = express();

setupMiddleware(server);
setupRoutes(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
