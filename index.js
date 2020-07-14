const SERVER = require("./api/server");
const PORT = process.env.PORT;

SERVER.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
