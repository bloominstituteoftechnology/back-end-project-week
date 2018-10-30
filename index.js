const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configureRoutes = require("./routes");
const server = express();
const helmet = require("helmet");
//const morgan = require("morgan");

server.use(express.json());
server.use(helmet());


server.listen(5500, () => console.log('\nrunning on port 5500\n'));
server.use(cors({ origin: "http://localhost:3000" }));
    
server.use(express.json());
server.use(bodyParser.json());
//if (process.env.ENV === "production") app.use(morgan("combined"));
//else app.use(morgan("dev"));

const indexRouter = require("./routes/index");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const listRouter = require("./routes/list");

server.use("/", indexRouter);
server.use("/api/notes", notesRouter);
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/lists", listRouter);
server.use(require("./middleware/index").errorHandler);
module.exports = {
    server,
};

