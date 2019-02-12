const {server} = require('./Api/server');
const PORT = 5000;

server.get('/api/notes', (req, res) => {
    res.status(200)
    .json({message: "this is working"});
 })


server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})