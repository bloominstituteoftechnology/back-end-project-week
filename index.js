require('dotenv').config();

const server = require("./server.js"); // imports server

// process.env.Port assign port number when deployed on a online server
const PORT = process.env.PORT || 9000;

//* Sanity Check
// server.get("/", (req, res) => {
//   res.status(200).json(`Server Online in port = ${PORT}`);
// });

//* Server Awakens
server.listen(PORT, () =>
  console.log(`\n=== 🦄  Server Listens and Obeys on ${PORT} 🚀  ===\n`)
);
