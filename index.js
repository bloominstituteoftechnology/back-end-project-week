const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const app = new express();

app.use(express.json());
app.use(helmet());
app.use(cors());

    
app.use(express.json());
app.use(bodyParser.json());

if (process.env.ENV === "production") app.use(morgan("combined"));
else app.use(morgan("dev"));

const indexRouter = require("./routes/index");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const listRouter = require("./routes/list");

app.use("/", indexRouter);
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);
app.use(require("./middleware/index").errorHandler);

app.listen(process.env.PORT || 5500)

module.exports = app;


