const {server} = require('./Api/server');
const PORT = 5000;



server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})