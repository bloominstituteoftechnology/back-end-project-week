const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const tagRouter = require("./tags/tagRouter");
const cors = require("cors");

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
	res.status(200).send({ api: "running..." });
});

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/tags", tagRouter);

const port = 3333;
server.listen(port, function() {
	console.log(`Server listening on ${port}`);
});
