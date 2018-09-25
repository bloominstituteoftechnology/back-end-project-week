const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/", routes);

function errorHandler(err, req, res, next) {
  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: "The requested information could not be found"
      });
      break;
    default:
      res.status(500).json({
        message: "There was an error performing the specified operation"
      });
      break;
  }
}

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Running on Port 8000");
});
