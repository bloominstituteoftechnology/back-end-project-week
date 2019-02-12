const {server} = require('./Api/server');
const PORT = 4050;



server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})