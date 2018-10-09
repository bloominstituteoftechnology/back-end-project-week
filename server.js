if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  {},
  err => {
    if (err) console.log("Database connection failed");
    console.log("Successfully Connected to MongoDB");
  }
);

const setupMiddleware = require("./api/Setup/middleware");
const setupRoutes = require("./api/Setup/routes");

server = express();

setupMiddleware(server);
setupRoutes(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
