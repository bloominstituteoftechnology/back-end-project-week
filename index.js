const SERVER = require("./api/server");
const PORT = process.env.PORT;

SERVER.get("/", (req, res) => {
  res.send("Server Active");
});
SERVER.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
