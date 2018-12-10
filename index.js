const {server} = require("./server");
const PORT = process.env.PORT || 3600;

server.listen(PORT, () => console.log(`\n** PORT ${PORT} is live **\n`));
